import dotenv from "dotenv";
import { ContractRunner, ethers } from "ethers";
import { ERC20__factory } from "./types/contracts/factories/ERC20__factory";
import { PoolManager__factory } from "./types/contracts/factories/PoolManager__factory";
import { PairPoolManager__factory } from "./types/contracts/factories/PairPoolManager__factory";
import { LendingPoolManager__factory } from "./types/contracts/factories/LendingPoolManager__factory";
import { MarginPositionManager__factory } from "./types/contracts/factories/MarginPositionManager__factory";
import { MarginChecker__factory } from "./types/contracts/factories/MarginChecker__factory";
import { MarginRouter__factory } from "./types/contracts/factories/MarginRouter__factory";
import { MarginLiquidity__factory } from "./types/contracts/factories/MarginLiquidity__factory";
import type { PoolKeyStruct, PoolManager } from "./types/contracts/PoolManager";
import type { LendingPoolManager } from "./types/contracts/LendingPoolManager";
import type {
  PairPoolManager,
  AddLiquidityParamsStruct,
  RemoveLiquidityParamsStruct,
} from "./types/contracts/PairPoolManager";
import type { MarginPositionManager, MarginParamsStruct } from "./types/contracts/MarginPositionManager";
import type { MarginChecker } from "./types/contracts/MarginChecker";
import type { MarginRouter } from "./types/contracts/MarginRouter";

interface ContractAddresses {
  poolManager: string; // Uniswap PoolManager
  pairPoolManager: string;
  lendingPoolManager: string;
  marginChecker: string;
  marginPositionManager: string;
  marginRouter: string;
  marginHook: string;
}

interface Contracts {
  poolManager: PoolManager;
  pairPoolManager: PairPoolManager;
  lendingPoolManager: LendingPoolManager;
  marginChecker: MarginChecker;
  marginPositionManager: MarginPositionManager;
  marginRouter: MarginRouter;
}

async function initializeContracts(addresses: ContractAddresses, runner: ContractRunner): Promise<Contracts> {
  const poolManager = PoolManager__factory.connect(addresses.poolManager, runner);
  const pairPoolManager = PairPoolManager__factory.connect(addresses.pairPoolManager, runner);
  const lendingPoolManager = LendingPoolManager__factory.connect(addresses.lendingPoolManager, runner);
  const marginChecker = MarginChecker__factory.connect(addresses.marginChecker, runner);
  const marginPositionManager = MarginPositionManager__factory.connect(addresses.marginPositionManager, runner);
  const marginRouter = MarginRouter__factory.connect(addresses.marginRouter, runner);

  return {
    poolManager,
    pairPoolManager,
    lendingPoolManager,
    marginChecker,
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
    poolManager: "0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    pairPoolManager: "0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    lendingPoolManager: "0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    marginPositionManager: "0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    marginChecker: "0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    marginRouter: "0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    marginHook: "0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  };
  const contracts = await initializeContracts(addresses, wallet);
  const user = wallet.address;
  console.log("user.address:", user);
  const ethAddress = "0x0000000000000000000000000000000000000000"; // ETH
  const tokenAddress = "0x8B099F91C710Ce9E5EE5b7F2E83db9bAc3378975"; // LIKWID
  const tokenContract = ERC20__factory.connect(tokenAddress, wallet);
  const poolKey: PoolKeyStruct = {
    currency0: ethAddress,
    currency1: tokenAddress,
    fee: 3000, // 0.3%
    tickSpacing: 1,
    hooks: addresses.marginHook,
  };
  const encodedData = ethers.AbiCoder.defaultAbiCoder().encode(
    ["address", "address", "uint24", "int24", "address"],
    [poolKey.currency0, poolKey.currency1, poolKey.fee, poolKey.tickSpacing, poolKey.hooks]
  );
  const poolId = ethers.keccak256(encodedData);
  try {
    // initialize pool
    const sqrtPriceX96_1_1 = 79228162514264337593543950336n;
    const tx = await contracts.poolManager.initialize(poolKey, sqrtPriceX96_1_1);
    await tx.wait();
    console.log("Uniswap PoolManager initialized.tx hash:", tx.hash);
  } catch (error) {
    // There are multiple possible reasons for failure: 1, the pool has already been initialized; 2, currency0 >= currency1; 3, other reasons.
    console.error("Uniswap PoolManager initialization failed:", error);
  }

  console.log("poolId:", poolId);
  const status = await contracts.pairPoolManager.getStatus(poolId);
  console.log("status:", status);
  const reserves = await contracts.pairPoolManager.getReserves(poolId);
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
    amount0Min: (amount0In * 995n) / 1000n,
    amount1Min: (amount1In * 995n) / 1000n,
    level: 4,
    source: user,
    deadline: Math.floor(Date.now() / 1000) + 100,
  };
  // approve token
  await (await tokenContract.approve(addresses.pairPoolManager, amount1In)).wait();
  try {
    const tx = await contracts.pairPoolManager.addLiquidity(addLiquidityParams, { value: amount0In });
    await tx.wait();
    console.log("Margin hook manager addLiquidity succeed.tx hash:", tx.hash);
  } catch (error) {
    console.error("Margin hook manager addLiquidity failed:", error);
  }
  const liquidityAddress = await contracts.pairPoolManager.marginLiquidity();
  console.log("liquidityAddress:", liquidityAddress);
  const liquidityContract = MarginLiquidity__factory.connect(liquidityAddress, wallet);
  const lpPoolId = await liquidityContract.getPoolId(poolId);
  const levelPoolId = lpPoolId + 4n;
  const liquidity = await liquidityContract.balanceOf(user, levelPoolId);
  console.log("liquidity:", liquidity);
  // remove liquidity
  const removeLiquidityParams: RemoveLiquidityParamsStruct = {
    poolId: poolId,
    amount0Min: 0n,
    amount1Min: 0n,
    level: 4,
    liquidity: liquidity / 10n,
    deadline: Math.floor(Date.now() / 1000) + 100,
  };
  try {
    const tx = await contracts.pairPoolManager.removeLiquidity(removeLiquidityParams);
    await tx.wait();
    console.log("Margin hook manager removeLiquidity succeed.tx hash:", tx.hash);
  } catch (error) {
    console.error("Margin hook manager removeLiquidity failed:", error);
  }

  // Margin Sell
  let marginForOne = false; // If true, currency1 is marginToken, otherwise currency2 is marginToken
  const marginSellAmount = ethers.parseEther("0.001");
  const leverage = 1n; // Multiple 1~5, does not support decimals.

  let borrowAmount = await contracts.pairPoolManager.getAmountIn(poolId, marginForOne, marginSellAmount * leverage);

  const marginSellParams: MarginParamsStruct = {
    poolId: poolId,
    marginForOne: marginForOne,
    leverage: leverage,
    marginAmount: marginSellAmount,
    borrowAmount: borrowAmount,
    borrowMaxAmount: (borrowAmount * 1005n) / 1000n, // 0.5% Slippage
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
  borrowAmount = await contracts.pairPoolManager.getAmountIn(poolId, marginForOne, marginBuyAmount * leverage);
  const marginBuyParams: MarginParamsStruct = {
    poolId: poolId,
    marginForOne: marginForOne,
    leverage: leverage,
    marginAmount: marginBuyAmount,
    borrowAmount: borrowAmount,
    borrowMaxAmount: (borrowAmount * 1005n) / 1000n, // 0.5% Slippage
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
  let positionId = await contracts.marginPositionManager.getPositionId(poolId, marginForOne, user, true);
  console.log("Margin Sell positionId:", positionId);
  let sellPosition = await contracts.marginPositionManager.getPosition(positionId);
  const repayAmount = sellPosition.borrowAmount / 2n;
  console.log("Before repay borrowAmount", sellPosition.borrowAmount);
  // approve token
  await (await tokenContract.approve(addresses.pairPoolManager, repayAmount)).wait();
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
  positionId = await contracts.marginPositionManager.getPositionId(poolId, marginForOne, user, true);
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

  // Borrow LIKWID
  marginForOne = false;
  const borrowMarginAmount = ethers.parseEther("0.001");
  borrowAmount = await contracts.pairPoolManager.getAmountOut(poolId, !marginForOne, borrowMarginAmount); // this is smaller than max borrow amount
  const borrowParams: MarginParamsStruct = {
    poolId: poolId,
    marginForOne: marginForOne,
    leverage: 0,
    marginAmount: borrowMarginAmount,
    borrowAmount: borrowAmount,
    borrowMaxAmount: (borrowAmount * 1005n) / 1000n, // 0.5% Slippage
    recipient: user,
    deadline: Math.floor(Date.now() / 1000) + 100,
  };
  try {
    const tx = await contracts.marginPositionManager.margin(borrowParams);
    await tx.wait();
    console.log("Margin Buy succeed.tx hash:", tx.hash);
  } catch (error) {
    console.error("Margin Buy failed:", error);
  }

  // Repay Borrow
  marginForOne = false;
  positionId = await contracts.marginPositionManager.getPositionId(poolId, marginForOne, user, false);
  console.log("Margin Sell positionId:", positionId);
  let borrowPosition = await contracts.marginPositionManager.getPosition(positionId);
  const repayBorrowAmount = sellPosition.borrowAmount / 2n;
  console.log("Before repay borrowAmount", borrowPosition.borrowAmount);
  // approve token
  await (await tokenContract.approve(addresses.pairPoolManager, repayBorrowAmount)).wait();
  deadline = Math.floor(Date.now() / 1000) + 100;
  try {
    const tx = await contracts.marginPositionManager.repay(positionId, repayBorrowAmount, deadline);
    tx.wait();
    console.log("Repay Borrow succeed.tx hash:", tx.hash);
  } catch (error) {
    console.error("Repay Borrow failed:", error);
  }
  borrowPosition = await contracts.marginPositionManager.getPosition(positionId);
  console.log("After repay borrowAmount", borrowPosition.borrowAmount);

  // Increase Margin Sell
  marginForOne = false;
  positionId = await contracts.marginPositionManager.getPositionId(poolId, marginForOne, user, true);
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
  const maxDecrease = await contracts.marginChecker["getMaxDecrease(address,uint256)"](
    addresses.marginPositionManager,
    positionId
  );

  const decreaseAmount = -increaseAmount;
  if (decreaseAmount < -maxDecrease) {
    console.error("Decrease amount is too large");
    return;
  }
  try {
    const tx = await contracts.marginPositionManager.modify(positionId, decreaseAmount);
    await tx.wait();
    console.log("Decrease Margin Sell succeed.tx hash:", tx.hash);
  } catch (error) {
    console.error("Decrease Margin Sell failed:", error);
  }

  // LendingPool deposit
  const depositAmount = ethers.parseEther("0.001");
  try {
    const tx = await contracts.lendingPoolManager["deposit(address,bytes32,address,uint256)"](
      user,
      poolId,
      ethAddress,
      depositAmount,
      { value: depositAmount }
    );
    await tx.wait();
    console.log("LendingPool deposit eth succeed.tx hash:", tx.hash);
  } catch (error) {
    console.error("LendingPool deposit eth failed:", error);
  }

  // LendingPool balanceOf
  const typesToEncode = ["address", "bytes32"];
  const valuesToEncode = [ethAddress, poolId];
  const idEncodedData = ethers.AbiCoder.defaultAbiCoder().encode(typesToEncode, valuesToEncode);
  const hash = ethers.keccak256(idEncodedData);
  const tokenId = ethers.toBigInt(hash);
  const lendingTokenBalance = await contracts.lendingPoolManager.balanceOf(user, tokenId);
  console.log("lendingTokenBalance:", lendingTokenBalance);

  // LendingPool withdraw
  try {
    const tx = await contracts.lendingPoolManager.withdraw(user, poolId, ethAddress, depositAmount);
    await tx.wait();
    console.log("LendingPool withdraw eth succeed.tx hash:", tx.hash);
  } catch (error) {
    console.error("LendingPool withdraw eth failed:", error);
  }

  // Swap Buy Token
  const swapAmountInETH = ethers.parseEther("0.001");
  const amountOut = await contracts.pairPoolManager.getAmountOut(poolId, true, swapAmountInETH);
  console.log("Swap Buy Token amountOut:", amountOut);
  let swapParams: MarginRouter.SwapParamsStruct = {
    poolId: poolId,
    zeroForOne: true,
    amountIn: swapAmountInETH,
    amountOutMin: (amountOut * 995n) / 1000n, // 0.5% Slippage
    amountOut: 0n,
    amountInMax: 0,
    to: user,
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
    amountOut: 0n,
    amountInMax: 0n,
    to: user,
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
