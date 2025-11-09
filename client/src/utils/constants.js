import MinimalAccount from "../../../smart_contracts/artifacts/contracts/MinimalAccount.sol/MinimalAccount.json";
import AccountFactory from "../../../smart_contracts/artifacts/contracts/AccountFactory.sol/AccountFactory.json";
import SmartPaymasterV2 from "../../../smart_contracts/artifacts/contracts/SmartPaymasterV2.sol/SmartPaymasterV2.json";


export const BASIC_PAYMASTER = "0x8C6088deF19254480FB867049CE68A8b50009BaD";
export const SMART_PAYMASTER = "0xe739ce37EfFb87503122c4fFC757464F2C9E580a";
export const V2SMART_PAYMASTER = "0xA53DCd3331d048F3BDA4B46341E8904DF927dAcD";

export const ACCOUNT_FACTORY_ADDRESS = "0xd4feE531618Ca50dE0969F7F75529586b331a6f0";

export const ENTRY_POINT_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
// export const MINIMAL_ACCOUNT_ADDRESS = "0x0bD6dc99C7Aaf56cC5A648476700294ad141aa76";
// export const MINIMAL_ACCOUNT_ADDRESS = "0x4FA8dA0604c9B085e22950E4530f6f7224bDE256";
export const MINIMAL_ACCOUNT_ADDRESS = "0x535006AC5CEe48a2e94e3fDd23577D24ab80D1c0";

export const ACCOUNT_FACTORY_ABI = AccountFactory.abi;
export const MINIMAL_ACCOUNT_ABI = MinimalAccount.abi;
export const SMART_PAYMASTER_V2 = SmartPaymasterV2.abi;