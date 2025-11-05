// SPDX-License-Identifier:MIT

pragma solidity ^0.8.28;

import {Script} from "forge-std/Script.sol";
import {MinimalAccount} from "../contracts/MinimalAccount.sol";
import { IEntryPoint } from "@account-abstraction/contracts/interfaces/IEntryPoint.sol";
import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import { UserOperation } from "@account-abstraction/contracts/interfaces/UserOperation.sol";
import { EntryPoint } from "@account-abstraction/contracts/core/EntryPoint.sol";


contract SendUserOp is Script {
    
    MinimalAccount public account;
    IEntryPoint public entryPoint;
    address public owner;
    uint256 public ownerKey;
    address public recipient;
    uint256 money = 10 ether;

    function setUp() public {
        (owner, ownerKey) = makeAddrAndKey("owner");
        recipient = makeAddr("recipient");
        // address ENTRY_POINT_ADDRESS = 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789;
        // entryPoint = IEntryPoint(ENTRY_POINT_ADDRESS);
        
        // vm.deal(owner,money);
        vm.deal(address(account),money);
    }


    function run() public {
        vm.startBroadcast(ownerKey);
        entryPoint = new EntryPoint();
        account = new MinimalAccount(address(entryPoint),owner);
        UserOperation memory userOp;

        userOp.sender = address(account);
        userOp.nonce = account.getNonce();
        userOp.initCode = "";
        userOp.callData = abi.encodeWithSelector(MinimalAccount.execute.selector, recipient, 0.2 ether, "");
        userOp.callGasLimit = 100000;
        userOp.verificationGasLimit = 100000;
        userOp.preVerificationGas = 21000;
        userOp.maxFeePerGas = tx.gasprice;
        userOp.maxPriorityFeePerGas = tx.gasprice;
        userOp.paymasterAndData = "";
        // bytes32 userOpHash = keccak256(abi.encode(
        //     userOp.sender, userOp.nonce, userOp.callData
        // ));

        bytes32 userOpHash = entryPoint.getUserOpHash(userOp);
        bytes32 ethSigned = ECDSA.toEthSignedMessageHash(userOpHash);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerKey,ethSigned);
        userOp.signature = abi.encodePacked(r,s,v);
        // transaction through bundler:
        UserOperation[] memory ops = new UserOperation[](1);
        ops[0] = userOp;
    
        entryPoint.handleOps(ops, payable(recipient));
        vm.stopBroadcast();

    }

}

