/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export type PoolKeyStruct = {
  currency0: AddressLike;
  currency1: AddressLike;
  fee: BigNumberish;
  tickSpacing: BigNumberish;
  hooks: AddressLike;
};

export type PoolKeyStructOutput = [
  currency0: string,
  currency1: string,
  fee: bigint,
  tickSpacing: bigint,
  hooks: string
] & {
  currency0: string;
  currency1: string;
  fee: bigint;
  tickSpacing: bigint;
  hooks: string;
};

export declare namespace IPoolManager {
  export type ModifyLiquidityParamsStruct = {
    tickLower: BigNumberish;
    tickUpper: BigNumberish;
    liquidityDelta: BigNumberish;
    salt: BytesLike;
  };

  export type ModifyLiquidityParamsStructOutput = [
    tickLower: bigint,
    tickUpper: bigint,
    liquidityDelta: bigint,
    salt: string
  ] & {
    tickLower: bigint;
    tickUpper: bigint;
    liquidityDelta: bigint;
    salt: string;
  };

  export type SwapParamsStruct = {
    zeroForOne: boolean;
    amountSpecified: BigNumberish;
    sqrtPriceLimitX96: BigNumberish;
  };

  export type SwapParamsStructOutput = [
    zeroForOne: boolean,
    amountSpecified: bigint,
    sqrtPriceLimitX96: bigint
  ] & {
    zeroForOne: boolean;
    amountSpecified: bigint;
    sqrtPriceLimitX96: bigint;
  };
}

export interface PoolManagerInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "allowance"
      | "approve"
      | "balanceOf"
      | "burn"
      | "clear"
      | "collectProtocolFees"
      | "donate"
      | "extsload(bytes32)"
      | "extsload(bytes32,uint256)"
      | "extsload(bytes32[])"
      | "exttload(bytes32[])"
      | "exttload(bytes32)"
      | "initialize"
      | "isOperator"
      | "mint"
      | "modifyLiquidity"
      | "owner"
      | "protocolFeeController"
      | "protocolFeesAccrued"
      | "setOperator"
      | "setProtocolFee"
      | "setProtocolFeeController"
      | "settle"
      | "settleFor"
      | "supportsInterface"
      | "swap"
      | "sync"
      | "take"
      | "transfer"
      | "transferFrom"
      | "transferOwnership"
      | "unlock"
      | "updateDynamicLPFee"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Approval"
      | "Donate"
      | "Initialize"
      | "ModifyLiquidity"
      | "OperatorSet"
      | "OwnershipTransferred"
      | "ProtocolFeeControllerUpdated"
      | "ProtocolFeeUpdated"
      | "Swap"
      | "Transfer"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "allowance",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [AddressLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "burn",
    values: [AddressLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "clear",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "collectProtocolFees",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "donate",
    values: [PoolKeyStruct, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "extsload(bytes32)",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "extsload(bytes32,uint256)",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "extsload(bytes32[])",
    values: [BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "exttload(bytes32[])",
    values: [BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "exttload(bytes32)",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [PoolKeyStruct, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isOperator",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [AddressLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "modifyLiquidity",
    values: [PoolKeyStruct, IPoolManager.ModifyLiquidityParamsStruct, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "protocolFeeController",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "protocolFeesAccrued",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setOperator",
    values: [AddressLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setProtocolFee",
    values: [PoolKeyStruct, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setProtocolFeeController",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "settle", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "settleFor",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "swap",
    values: [PoolKeyStruct, IPoolManager.SwapParamsStruct, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "sync", values: [AddressLike]): string;
  encodeFunctionData(
    functionFragment: "take",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [AddressLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [AddressLike, AddressLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "unlock", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "updateDynamicLPFee",
    values: [PoolKeyStruct, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "clear", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "collectProtocolFees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "donate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "extsload(bytes32)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "extsload(bytes32,uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "extsload(bytes32[])",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "exttload(bytes32[])",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "exttload(bytes32)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isOperator", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "modifyLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "protocolFeeController",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "protocolFeesAccrued",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setProtocolFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setProtocolFeeController",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "settle", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "settleFor", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sync", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "take", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unlock", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateDynamicLPFee",
    data: BytesLike
  ): Result;
}

export namespace ApprovalEvent {
  export type InputTuple = [
    owner: AddressLike,
    spender: AddressLike,
    id: BigNumberish,
    amount: BigNumberish
  ];
  export type OutputTuple = [
    owner: string,
    spender: string,
    id: bigint,
    amount: bigint
  ];
  export interface OutputObject {
    owner: string;
    spender: string;
    id: bigint;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DonateEvent {
  export type InputTuple = [
    id: BytesLike,
    sender: AddressLike,
    amount0: BigNumberish,
    amount1: BigNumberish
  ];
  export type OutputTuple = [
    id: string,
    sender: string,
    amount0: bigint,
    amount1: bigint
  ];
  export interface OutputObject {
    id: string;
    sender: string;
    amount0: bigint;
    amount1: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace InitializeEvent {
  export type InputTuple = [
    id: BytesLike,
    currency0: AddressLike,
    currency1: AddressLike,
    fee: BigNumberish,
    tickSpacing: BigNumberish,
    hooks: AddressLike,
    sqrtPriceX96: BigNumberish,
    tick: BigNumberish
  ];
  export type OutputTuple = [
    id: string,
    currency0: string,
    currency1: string,
    fee: bigint,
    tickSpacing: bigint,
    hooks: string,
    sqrtPriceX96: bigint,
    tick: bigint
  ];
  export interface OutputObject {
    id: string;
    currency0: string;
    currency1: string;
    fee: bigint;
    tickSpacing: bigint;
    hooks: string;
    sqrtPriceX96: bigint;
    tick: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ModifyLiquidityEvent {
  export type InputTuple = [
    id: BytesLike,
    sender: AddressLike,
    tickLower: BigNumberish,
    tickUpper: BigNumberish,
    liquidityDelta: BigNumberish,
    salt: BytesLike
  ];
  export type OutputTuple = [
    id: string,
    sender: string,
    tickLower: bigint,
    tickUpper: bigint,
    liquidityDelta: bigint,
    salt: string
  ];
  export interface OutputObject {
    id: string;
    sender: string;
    tickLower: bigint;
    tickUpper: bigint;
    liquidityDelta: bigint;
    salt: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OperatorSetEvent {
  export type InputTuple = [
    owner: AddressLike,
    operator: AddressLike,
    approved: boolean
  ];
  export type OutputTuple = [
    owner: string,
    operator: string,
    approved: boolean
  ];
  export interface OutputObject {
    owner: string;
    operator: string;
    approved: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [user: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [user: string, newOwner: string];
  export interface OutputObject {
    user: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ProtocolFeeControllerUpdatedEvent {
  export type InputTuple = [protocolFeeController: AddressLike];
  export type OutputTuple = [protocolFeeController: string];
  export interface OutputObject {
    protocolFeeController: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ProtocolFeeUpdatedEvent {
  export type InputTuple = [id: BytesLike, protocolFee: BigNumberish];
  export type OutputTuple = [id: string, protocolFee: bigint];
  export interface OutputObject {
    id: string;
    protocolFee: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SwapEvent {
  export type InputTuple = [
    id: BytesLike,
    sender: AddressLike,
    amount0: BigNumberish,
    amount1: BigNumberish,
    sqrtPriceX96: BigNumberish,
    liquidity: BigNumberish,
    tick: BigNumberish,
    fee: BigNumberish
  ];
  export type OutputTuple = [
    id: string,
    sender: string,
    amount0: bigint,
    amount1: bigint,
    sqrtPriceX96: bigint,
    liquidity: bigint,
    tick: bigint,
    fee: bigint
  ];
  export interface OutputObject {
    id: string;
    sender: string;
    amount0: bigint;
    amount1: bigint;
    sqrtPriceX96: bigint;
    liquidity: bigint;
    tick: bigint;
    fee: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransferEvent {
  export type InputTuple = [
    caller: AddressLike,
    from: AddressLike,
    to: AddressLike,
    id: BigNumberish,
    amount: BigNumberish
  ];
  export type OutputTuple = [
    caller: string,
    from: string,
    to: string,
    id: bigint,
    amount: bigint
  ];
  export interface OutputObject {
    caller: string;
    from: string;
    to: string;
    id: bigint;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface PoolManager extends BaseContract {
  connect(runner?: ContractRunner | null): PoolManager;
  waitForDeployment(): Promise<this>;

  interface: PoolManagerInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  allowance: TypedContractMethod<
    [owner: AddressLike, spender: AddressLike, id: BigNumberish],
    [bigint],
    "view"
  >;

  approve: TypedContractMethod<
    [spender: AddressLike, id: BigNumberish, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  balanceOf: TypedContractMethod<
    [owner: AddressLike, id: BigNumberish],
    [bigint],
    "view"
  >;

  burn: TypedContractMethod<
    [from: AddressLike, id: BigNumberish, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  clear: TypedContractMethod<
    [currency: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  collectProtocolFees: TypedContractMethod<
    [recipient: AddressLike, currency: AddressLike, amount: BigNumberish],
    [bigint],
    "nonpayable"
  >;

  donate: TypedContractMethod<
    [
      key: PoolKeyStruct,
      amount0: BigNumberish,
      amount1: BigNumberish,
      hookData: BytesLike
    ],
    [bigint],
    "nonpayable"
  >;

  "extsload(bytes32)": TypedContractMethod<[slot: BytesLike], [string], "view">;

  "extsload(bytes32,uint256)": TypedContractMethod<
    [startSlot: BytesLike, nSlots: BigNumberish],
    [string[]],
    "view"
  >;

  "extsload(bytes32[])": TypedContractMethod<
    [slots: BytesLike[]],
    [string[]],
    "view"
  >;

  "exttload(bytes32[])": TypedContractMethod<
    [slots: BytesLike[]],
    [string[]],
    "view"
  >;

  "exttload(bytes32)": TypedContractMethod<[slot: BytesLike], [string], "view">;

  initialize: TypedContractMethod<
    [key: PoolKeyStruct, sqrtPriceX96: BigNumberish],
    [bigint],
    "nonpayable"
  >;

  isOperator: TypedContractMethod<
    [owner: AddressLike, operator: AddressLike],
    [boolean],
    "view"
  >;

  mint: TypedContractMethod<
    [to: AddressLike, id: BigNumberish, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  modifyLiquidity: TypedContractMethod<
    [
      key: PoolKeyStruct,
      params: IPoolManager.ModifyLiquidityParamsStruct,
      hookData: BytesLike
    ],
    [[bigint, bigint] & { callerDelta: bigint; feesAccrued: bigint }],
    "nonpayable"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  protocolFeeController: TypedContractMethod<[], [string], "view">;

  protocolFeesAccrued: TypedContractMethod<
    [currency: AddressLike],
    [bigint],
    "view"
  >;

  setOperator: TypedContractMethod<
    [operator: AddressLike, approved: boolean],
    [boolean],
    "nonpayable"
  >;

  setProtocolFee: TypedContractMethod<
    [key: PoolKeyStruct, newProtocolFee: BigNumberish],
    [void],
    "nonpayable"
  >;

  setProtocolFeeController: TypedContractMethod<
    [controller: AddressLike],
    [void],
    "nonpayable"
  >;

  settle: TypedContractMethod<[], [bigint], "payable">;

  settleFor: TypedContractMethod<[recipient: AddressLike], [bigint], "payable">;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  swap: TypedContractMethod<
    [
      key: PoolKeyStruct,
      params: IPoolManager.SwapParamsStruct,
      hookData: BytesLike
    ],
    [bigint],
    "nonpayable"
  >;

  sync: TypedContractMethod<[currency: AddressLike], [void], "nonpayable">;

  take: TypedContractMethod<
    [currency: AddressLike, to: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  transfer: TypedContractMethod<
    [receiver: AddressLike, id: BigNumberish, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  transferFrom: TypedContractMethod<
    [
      sender: AddressLike,
      receiver: AddressLike,
      id: BigNumberish,
      amount: BigNumberish
    ],
    [boolean],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  unlock: TypedContractMethod<[data: BytesLike], [string], "nonpayable">;

  updateDynamicLPFee: TypedContractMethod<
    [key: PoolKeyStruct, newDynamicLPFee: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "allowance"
  ): TypedContractMethod<
    [owner: AddressLike, spender: AddressLike, id: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "approve"
  ): TypedContractMethod<
    [spender: AddressLike, id: BigNumberish, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "balanceOf"
  ): TypedContractMethod<
    [owner: AddressLike, id: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "burn"
  ): TypedContractMethod<
    [from: AddressLike, id: BigNumberish, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "clear"
  ): TypedContractMethod<
    [currency: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "collectProtocolFees"
  ): TypedContractMethod<
    [recipient: AddressLike, currency: AddressLike, amount: BigNumberish],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "donate"
  ): TypedContractMethod<
    [
      key: PoolKeyStruct,
      amount0: BigNumberish,
      amount1: BigNumberish,
      hookData: BytesLike
    ],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "extsload(bytes32)"
  ): TypedContractMethod<[slot: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "extsload(bytes32,uint256)"
  ): TypedContractMethod<
    [startSlot: BytesLike, nSlots: BigNumberish],
    [string[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "extsload(bytes32[])"
  ): TypedContractMethod<[slots: BytesLike[]], [string[]], "view">;
  getFunction(
    nameOrSignature: "exttload(bytes32[])"
  ): TypedContractMethod<[slots: BytesLike[]], [string[]], "view">;
  getFunction(
    nameOrSignature: "exttload(bytes32)"
  ): TypedContractMethod<[slot: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "initialize"
  ): TypedContractMethod<
    [key: PoolKeyStruct, sqrtPriceX96: BigNumberish],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "isOperator"
  ): TypedContractMethod<
    [owner: AddressLike, operator: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "mint"
  ): TypedContractMethod<
    [to: AddressLike, id: BigNumberish, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "modifyLiquidity"
  ): TypedContractMethod<
    [
      key: PoolKeyStruct,
      params: IPoolManager.ModifyLiquidityParamsStruct,
      hookData: BytesLike
    ],
    [[bigint, bigint] & { callerDelta: bigint; feesAccrued: bigint }],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "protocolFeeController"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "protocolFeesAccrued"
  ): TypedContractMethod<[currency: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "setOperator"
  ): TypedContractMethod<
    [operator: AddressLike, approved: boolean],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setProtocolFee"
  ): TypedContractMethod<
    [key: PoolKeyStruct, newProtocolFee: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setProtocolFeeController"
  ): TypedContractMethod<[controller: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "settle"
  ): TypedContractMethod<[], [bigint], "payable">;
  getFunction(
    nameOrSignature: "settleFor"
  ): TypedContractMethod<[recipient: AddressLike], [bigint], "payable">;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "swap"
  ): TypedContractMethod<
    [
      key: PoolKeyStruct,
      params: IPoolManager.SwapParamsStruct,
      hookData: BytesLike
    ],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "sync"
  ): TypedContractMethod<[currency: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "take"
  ): TypedContractMethod<
    [currency: AddressLike, to: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transfer"
  ): TypedContractMethod<
    [receiver: AddressLike, id: BigNumberish, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferFrom"
  ): TypedContractMethod<
    [
      sender: AddressLike,
      receiver: AddressLike,
      id: BigNumberish,
      amount: BigNumberish
    ],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "unlock"
  ): TypedContractMethod<[data: BytesLike], [string], "nonpayable">;
  getFunction(
    nameOrSignature: "updateDynamicLPFee"
  ): TypedContractMethod<
    [key: PoolKeyStruct, newDynamicLPFee: BigNumberish],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "Approval"
  ): TypedContractEvent<
    ApprovalEvent.InputTuple,
    ApprovalEvent.OutputTuple,
    ApprovalEvent.OutputObject
  >;
  getEvent(
    key: "Donate"
  ): TypedContractEvent<
    DonateEvent.InputTuple,
    DonateEvent.OutputTuple,
    DonateEvent.OutputObject
  >;
  getEvent(
    key: "Initialize"
  ): TypedContractEvent<
    InitializeEvent.InputTuple,
    InitializeEvent.OutputTuple,
    InitializeEvent.OutputObject
  >;
  getEvent(
    key: "ModifyLiquidity"
  ): TypedContractEvent<
    ModifyLiquidityEvent.InputTuple,
    ModifyLiquidityEvent.OutputTuple,
    ModifyLiquidityEvent.OutputObject
  >;
  getEvent(
    key: "OperatorSet"
  ): TypedContractEvent<
    OperatorSetEvent.InputTuple,
    OperatorSetEvent.OutputTuple,
    OperatorSetEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "ProtocolFeeControllerUpdated"
  ): TypedContractEvent<
    ProtocolFeeControllerUpdatedEvent.InputTuple,
    ProtocolFeeControllerUpdatedEvent.OutputTuple,
    ProtocolFeeControllerUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "ProtocolFeeUpdated"
  ): TypedContractEvent<
    ProtocolFeeUpdatedEvent.InputTuple,
    ProtocolFeeUpdatedEvent.OutputTuple,
    ProtocolFeeUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "Swap"
  ): TypedContractEvent<
    SwapEvent.InputTuple,
    SwapEvent.OutputTuple,
    SwapEvent.OutputObject
  >;
  getEvent(
    key: "Transfer"
  ): TypedContractEvent<
    TransferEvent.InputTuple,
    TransferEvent.OutputTuple,
    TransferEvent.OutputObject
  >;

  filters: {
    "Approval(address,address,uint256,uint256)": TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;
    Approval: TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;

    "Donate(bytes32,address,uint256,uint256)": TypedContractEvent<
      DonateEvent.InputTuple,
      DonateEvent.OutputTuple,
      DonateEvent.OutputObject
    >;
    Donate: TypedContractEvent<
      DonateEvent.InputTuple,
      DonateEvent.OutputTuple,
      DonateEvent.OutputObject
    >;

    "Initialize(bytes32,address,address,uint24,int24,address,uint160,int24)": TypedContractEvent<
      InitializeEvent.InputTuple,
      InitializeEvent.OutputTuple,
      InitializeEvent.OutputObject
    >;
    Initialize: TypedContractEvent<
      InitializeEvent.InputTuple,
      InitializeEvent.OutputTuple,
      InitializeEvent.OutputObject
    >;

    "ModifyLiquidity(bytes32,address,int24,int24,int256,bytes32)": TypedContractEvent<
      ModifyLiquidityEvent.InputTuple,
      ModifyLiquidityEvent.OutputTuple,
      ModifyLiquidityEvent.OutputObject
    >;
    ModifyLiquidity: TypedContractEvent<
      ModifyLiquidityEvent.InputTuple,
      ModifyLiquidityEvent.OutputTuple,
      ModifyLiquidityEvent.OutputObject
    >;

    "OperatorSet(address,address,bool)": TypedContractEvent<
      OperatorSetEvent.InputTuple,
      OperatorSetEvent.OutputTuple,
      OperatorSetEvent.OutputObject
    >;
    OperatorSet: TypedContractEvent<
      OperatorSetEvent.InputTuple,
      OperatorSetEvent.OutputTuple,
      OperatorSetEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "ProtocolFeeControllerUpdated(address)": TypedContractEvent<
      ProtocolFeeControllerUpdatedEvent.InputTuple,
      ProtocolFeeControllerUpdatedEvent.OutputTuple,
      ProtocolFeeControllerUpdatedEvent.OutputObject
    >;
    ProtocolFeeControllerUpdated: TypedContractEvent<
      ProtocolFeeControllerUpdatedEvent.InputTuple,
      ProtocolFeeControllerUpdatedEvent.OutputTuple,
      ProtocolFeeControllerUpdatedEvent.OutputObject
    >;

    "ProtocolFeeUpdated(bytes32,uint24)": TypedContractEvent<
      ProtocolFeeUpdatedEvent.InputTuple,
      ProtocolFeeUpdatedEvent.OutputTuple,
      ProtocolFeeUpdatedEvent.OutputObject
    >;
    ProtocolFeeUpdated: TypedContractEvent<
      ProtocolFeeUpdatedEvent.InputTuple,
      ProtocolFeeUpdatedEvent.OutputTuple,
      ProtocolFeeUpdatedEvent.OutputObject
    >;

    "Swap(bytes32,address,int128,int128,uint160,uint128,int24,uint24)": TypedContractEvent<
      SwapEvent.InputTuple,
      SwapEvent.OutputTuple,
      SwapEvent.OutputObject
    >;
    Swap: TypedContractEvent<
      SwapEvent.InputTuple,
      SwapEvent.OutputTuple,
      SwapEvent.OutputObject
    >;

    "Transfer(address,address,address,uint256,uint256)": TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
    Transfer: TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
  };
}
