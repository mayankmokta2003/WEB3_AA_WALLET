import MinimalAccount from "../../../smart_contracts/artifacts/contracts/MinimalAccount.sol/MinimalAccount.json";
import AccountFactory from "../../../smart_contracts/artifacts/contracts/AccountFactory.sol/AccountFactory.json";

export const ACCOUNT_FACTORY_ADDRESS = "0xd4feE531618Ca50dE0969F7F75529586b331a6f0";
export const ENTRY_POINT_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
// export const MINIMAL_ACCOUNT_ADDRESS = "0xe124717a527589Be33074af2915C6846d212B006";
export const MINIMAL_ACCOUNT_ADDRESS = "0x4FA8dA0604c9B085e22950E4530f6f7224bDE256";

export const ACCOUNT_FACTORY_ABI = AccountFactory.abi;
export const MINIMAL_ACCOUNT_ABI = MinimalAccount.abi;