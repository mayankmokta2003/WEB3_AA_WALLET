// SPDX-License-Identifier:MIT

pragma solidity ^0.8.28;

import {EntryPoint} from "@account-abstraction/contracts/core/EntryPoint.sol";

contract HelperConfig {

    struct NetworkConfig {
        address entryPoint;
        address account;
        address paymaster;
    }
    NetworkConfig public activeNetworkConfig;

    address constant SEPOLIA_ENTRY_POINT = 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789;
    address constant SEPOLIA_ACCOUNT = 0x7eb5b82F7754CAd509a8d13fB4092E1Fc77Ee951;
    address constant SEPOLIA_PAYMASTER = 0x8C6088deF19254480FB867049CE68A8b50009BaD;

    constructor() {
        if(block.chainid == 11155111){
            activeNetworkConfig = getSepoliaConfig();
        }else{
            activeNetworkConfig = getOrCreateAnvilConfig();
        }
    }

    function getSepoliaConfig() public pure returns (NetworkConfig memory) {
        return NetworkConfig({
            entryPoint: SEPOLIA_ENTRY_POINT,
            account: SEPOLIA_ACCOUNT,
            paymaster: SEPOLIA_PAYMASTER
        });
    }

    function getOrCreateAnvilConfig() public returns (NetworkConfig memory) {
        EntryPoint entryPoint = new EntryPoint();
        return NetworkConfig({
            entryPoint: address(entryPoint),
            account: msg.sender,
            paymaster: address(0)
        });
    }

}