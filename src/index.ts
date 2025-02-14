import dotenv from "dotenv";
import { ContractRunner, ethers } from "ethers";
import { ERC20__factory } from "./types/contracts/factories/ERC20__factory";
import { MarginHookManager__factory } from "./types/contracts/factories/MarginHookManager__factory";
import { MarginPositionManager__factory } from "./types/contracts/factories/MarginPositionManager__factory";
import { MarginChecker__factory } from "./types/contracts/factories/MarginChecker__factory";
import { MarginRouter__factory } from "./types/contracts/factories/MarginRouter__factory";
import { MarginLiquidity__factory } from "./types/contracts/factories/MarginLiquidity__factory";
import type {
  PoolKeyStruct,
  AddLiquidityParamsStruct,
  MarginHookManager,
  RemoveLiquidityParamsStruct,
} from "./types/contracts/MarginHookManager";
import type {
  MarginPositionManager,
  MarginParamsStruct,
  BurnParamsStruct,
} from "./types/contracts/MarginPositionManager";
import type { MarginChecker } from "./types/contracts/MarginChecker";
import type { MarginRouter } from "./types/contracts/MarginRouter";

interface ContractAddresses {
  marginChecker: string;
  marginHookManager: string;
  marginPositionManager: string;
  marginRouter: string;
}

interface Contracts {
  marginChecker: MarginChecker;
  marginHookManager: MarginHookManager;
  marginPositionManager: MarginPositionManager;
  marginRouter: MarginRouter;
}

async function initializeContracts(addresses: ContractAddresses, runner: ContractRunner): Promise<Contracts> {
  const marginChecker = MarginChecker__factory.connect(addresses.marginChecker, runner);

  const marginHookManager = MarginHookManager__factory.connect(addresses.marginHookManager, runner);

  const marginPositionManager = MarginPositionManager__factory.connect(addresses.marginPositionManager, runner);

  const marginRouter = MarginRouter__factory.connect(addresses.marginRouter, runner);

  return {
    marginChecker,
    marginHookManager,
    marginPositionManager,
    marginRouter,
  };
}

dotenv.config();

async function main() {
  // 11155111 sepolia
  const rpcUrl = "https://ethereum-sepolia.publicnode.com";
  const privateKey = process.env["PRIVATE_KEY"] || "";
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  const addresses: ContractAddresses = {
    marginHookManager: "0xAeC3B6Af00ACA8E5dE1a5222C7b07766659D0888",
    marginPositionManager: "0x2064b9C6D3baDa53FE305eA5fDdF26056b3aBf4e",
    marginChecker: "0xc3C1D0f7919aBdb52047206D40767DAbFaC454eA",
    marginRouter: "0x73Ddf6643b8DFDd0cDBE1C83394448a040E1eA0c",
  };
  const contracts = await initializeContracts(addresses, wallet);
  const user = wallet.address;
  console.log("user:", user);
  const ethAddress = "0x0000000000000000000000000000000000000000"; // ETH
  const tokenAddress = "0x8B099F91C710Ce9E5EE5b7F2E83db9bAc3378975"; // LIKWID
  const tokenContract = ERC20__factory.connect(tokenAddress, wallet);
  const poolKey: PoolKeyStruct = {
    currency0: ethAddress,
    currency1: tokenAddress,
    fee: 3000, // 0.3%
    tickSpacing: 1,
    hooks: addresses.marginHookManager,
  };
  const encodedData = ethers.AbiCoder.defaultAbiCoder().encode(
    ["address", "address", "uint24", "int24", "address"],
    [poolKey.currency0, poolKey.currency1, poolKey.fee, poolKey.tickSpacing, poolKey.hooks]
  );
  const poolId = ethers.keccak256(encodedData);
  try {
    // initialize pool
    const tx = await contracts.marginHookManager.initialize(poolKey);
    await tx.wait();
    console.log("Margin hook manager initialized.tx hash:", tx.hash);
  } catch (error) {
    // There are multiple possible reasons for failure: 1, the pool has already been initialized; 2, currency0 >= currency1; 3, other reasons.
    console.error("Margin hook manager initialization failed:", error);
  }

  console.log("poolId:", poolId);
  const status = await contracts.marginHookManager.getStatus(poolId);
  console.log("status:", status);
  const reserves = await contracts.marginHookManager.getReserves(poolId);
  console.log("reserves:", reserves);
  // Add liquidity proportionally
  const amount0In = ethers.parseEther("0.01");
  const amount1In = (amount0In * reserves._reserve1) / reserves._reserve0;
  const token1Balance = await tokenContract.balanceOf(user);
  if (amount1In > token1Balance) {
    console.error("Not enough token1 balance");
    return;
  }
  console.log("amount0In:", amount0In);
  console.log("amount1In:", amount1In);
  //  add liquidity
  const addLiquidityParams: AddLiquidityParamsStruct = {
    poolId: poolId,
    amount0: amount0In,
    amount1: amount1In,
    tickLower: 50000,
    tickUpper: 50000,
    level: 4,
    to: user,
    deadline: Math.floor(Date.now() / 1000) + 100,
  };
  // approve token
  await (await tokenContract.approve(addresses.marginHookManager, amount1In)).wait();
  try {
    const tx = await contracts.marginHookManager.addLiquidity(addLiquidityParams, { value: amount0In });
    await tx.wait();
    console.log("Margin hook manager addLiquidity succeed.tx hash:", tx.hash);
  } catch (error) {
    console.error("Margin hook manager addLiquidity failed:", error);
  }
  const liquidityAddress = await contracts.marginHookManager.marginLiquidity();
  console.log("liquidityAddress:", liquidityAddress);
  const liquidityContract = MarginLiquidity__factory.connect(liquidityAddress, wallet);
  const lpPoolId = await liquidityContract.getPoolId(poolId);
  const levelPoolId = await liquidityContract.getLevelPool(lpPoolId, 4);
  const liquidity = await liquidityContract.balanceOf(user, levelPoolId);
  console.log("liquidity:", liquidity);
  // remove liquidity
  const removeLiquidityParams: RemoveLiquidityParamsStruct = {
    poolId: poolId,
    level: 4,
    liquidity: liquidity / 10n,
    deadline: Math.floor(Date.now() / 1000) + 100,
  };
  try {
    const tx = await contracts.marginHookManager.removeLiquidity(removeLiquidityParams);
    await tx.wait();
    console.log("Margin hook manager removeLiquidity succeed.tx hash:", tx.hash);
  } catch (error) {
    console.error("Margin hook manager removeLiquidity failed:", error);
  }

  // Margin Sell
  let marginForOne = false; // If true, currency1 is marginToken, otherwise currency2 is marginToken
  const marginSellAmount = ethers.parseEther("0.001");
  const leverage = 1n; // Multiple 1~5, does not support decimals.
  let marginTotalParams = await contracts.marginPositionManager.getMarginTotal(
    poolId,
    marginForOne,
    leverage,
    marginSellAmount
  );
  const marginSellParams: MarginParamsStruct = {
    poolId: poolId,
    marginForOne: marginForOne,
    leverage: leverage,
    marginAmount: marginSellAmount,
    marginTotal: marginTotalParams.marginWithoutFee,
    borrowAmount: marginTotalParams.borrowAmount,
    borrowMinAmount: (marginTotalParams.borrowAmount * 995n) / 1000n, // 0.5% Slippage
    recipient: user,
    deadline: Math.floor(Date.now() / 1000) + 100,
  };
  try {
    const tx = await contracts.marginPositionManager.margin(marginSellParams, { value: marginSellAmount });
    await tx.wait();
    console.log("Margin Sell succeed.tx hash:", tx.hash);
  } catch (error) {
    console.error("Margin Sell failed:", error);
  }

  // Margin Buy
  marginForOne = true;
  const marginBuyAmount = ethers.parseEther("1000");
  // approve position token
  await (await tokenContract.approve(addresses.marginPositionManager, marginBuyAmount)).wait();
  marginTotalParams = await contracts.marginPositionManager.getMarginTotal(
    poolId,
    marginForOne,
    leverage,
    marginBuyAmount
  );
  const marginBuyParams: MarginParamsStruct = {
    poolId: poolId,
    marginForOne: marginForOne,
    leverage: leverage,
    marginAmount: marginBuyAmount,
    marginTotal: marginTotalParams.marginWithoutFee,
    borrowAmount: marginTotalParams.borrowAmount,
    borrowMinAmount: (marginTotalParams.borrowAmount * 995n) / 1000n, // 0.5% Slippage
    recipient: user,
    deadline: Math.floor(Date.now() / 1000) + 100,
  };
  try {
    const tx = await contracts.marginPositionManager.margin(marginBuyParams);
    await tx.wait();
    console.log("Margin Buy succeed.tx hash:", tx.hash);
  } catch (error) {
    console.error("Margin Buy failed:", error);
  }

  // Repay Margin Sell
  marginForOne = false;
  let positionId = await contracts.marginPositionManager.getPositionId(poolId, marginForOne, user);
  console.log("Margin Sell positionId:", positionId);
  let sellPosition = await contracts.marginPositionManager.getPosition(positionId);
  const repayAmount = sellPosition.borrowAmount / 2n; // 还一半
  console.log("Before repay borrowAmount", sellPosition.borrowAmount);
  // approve token
  await (await tokenContract.approve(addresses.marginHookManager, repayAmount)).wait();
  let deadline = Math.floor(Date.now() / 1000) + 100;
  try {
    const tx = await contracts.marginPositionManager.repay(positionId, repayAmount, deadline);
    tx.wait();
    console.log("Repay Margin Sell succeed.tx hash:", tx.hash);
  } catch (error) {
    console.error("Repay Margin Sell failed:", error);
  }
  sellPosition = await contracts.marginPositionManager.getPosition(positionId);
  console.log("After repay borrowAmount", sellPosition.borrowAmount);

  // Close Margin Buy
  marginForOne = true;
  positionId = await contracts.marginPositionManager.getPositionId(poolId, marginForOne, user);
  console.log("Margin Buy positionId:", positionId);
  let buyPosition = await contracts.marginPositionManager.getPosition(positionId);
  console.log("Before close borrowAmount", buyPosition.borrowAmount);
  const repayMillionth = 500000n; // 50%
  const pnlMinAmount = 0n; // Close regardless of the PNL amount
  deadline = Math.floor(Date.now() / 1000) + 100;
  try {
    const tx = await contracts.marginPositionManager.close(positionId, repayMillionth, pnlMinAmount, deadline);
    await tx.wait();
    console.log("Close Margin Buy succeed.tx hash:", tx.hash);
  } catch (error) {
    console.error("Close Margin Buy failed:", error);
  }
  buyPosition = await contracts.marginPositionManager.getPosition(positionId);
  console.log("After close borrowAmount", buyPosition.borrowAmount);

  // Increase Margin Sell
  marginForOne = false;
  positionId = await contracts.marginPositionManager.getPositionId(poolId, marginForOne, user);
  console.log("Margin Sell positionId:", positionId);
  const increaseAmount = ethers.parseEther("0.001");
  deadline = Math.floor(Date.now() / 1000) + 100;
  try {
    const tx = await contracts.marginPositionManager.modify(positionId, increaseAmount);
    await tx.wait();
    console.log("Increase Margin Sell succeed.tx hash:", tx.hash);
  } catch (error) {
    console.error("Increase Margin Sell failed:", error);
  }

  // Decrease Margin Sell
  const decreaseAmount = -increaseAmount;
  try {
    const tx = await contracts.marginPositionManager.modify(positionId, decreaseAmount);
    await tx.wait();
    console.log("Decrease Margin Sell succeed.tx hash:", tx.hash);
  } catch (error) {
    console.error("Decrease Margin Sell failed:", error);
  }

  // Swap Buy Token
  const swapAmountInETH = ethers.parseEther("0.001");
  const amountOut = await contracts.marginHookManager.getAmountOut(poolId, true, swapAmountInETH);
  console.log("Swap Buy Token amountOut:", amountOut);
  let swapParams: MarginRouter.SwapParamsStruct = {
    poolId: poolId,
    zeroForOne: true,
    amountIn: swapAmountInETH,
    amountOutMin: (amountOut * 995n) / 1000n, // 0.5% Slippage
    to: user,
    amountOut: 0n,
    deadline: Math.floor(Date.now() / 1000) + 100,
  };
  try {
    const tx = await contracts.marginRouter.exactInput(swapParams, { value: swapAmountInETH });
    await tx.wait();
    console.log("Swap Buy Token succeed.tx hash:", tx.hash);
  } catch (error) {
    console.error("Swap Buy Token failed:", error);
  }

  // Swap Sell Token
  const swapAmountInToken = ethers.parseEther("100");
  swapParams = {
    poolId: poolId,
    zeroForOne: false,
    amountIn: swapAmountInToken,
    amountOutMin: 0n, // Swap regardless of the amount
    to: user,
    amountOut: 0n,
    deadline: Math.floor(Date.now() / 1000) + 100,
  };
  // approve token
  await (await tokenContract.approve(addresses.marginRouter, swapAmountInToken)).wait();
  try {
    const tx = await contracts.marginRouter.exactInput(swapParams);
    await tx.wait();
    console.log("Swap Sell Token succeed.tx hash:", tx.hash);
  } catch (error) {
    console.error("Swap Sell Token failed:", error);
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
