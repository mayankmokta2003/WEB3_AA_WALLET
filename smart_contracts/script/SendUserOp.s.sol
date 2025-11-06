// // SPDX-License-Identifier:MIT

// pragma solidity ^0.8.28;

// import {Script , console} from "forge-std/Script.sol";
// import {MinimalAccount} from "../contracts/MinimalAccount.sol";
// import { IEntryPoint } from "@account-abstraction/contracts/interfaces/IEntryPoint.sol";
// import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
// import { UserOperation } from "@account-abstraction/contracts/interfaces/UserOperation.sol";
// import { EntryPoint } from "@account-abstraction/contracts/core/EntryPoint.sol";


// contract SendUserOp is Script {
    
//     MinimalAccount public account;
//     IEntryPoint public entryPoint;
//     address public owner;
//     uint256 public ownerKey;
//     address public recipient;
    

//     function setUp() public {
//         // (owner, ownerKey) = makeAddrAndKey("owner");


//         ownerKey = vm.envUint("PRIVATE_KEY");
//         owner = vm.addr(ownerKey);
//         recipient = makeAddr("recipient");
//         vm.deal(recipient, 1 ether);
//         // address ENTRY_POINT_ADDRESS = 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789;
//         // entryPoint = IEntryPoint(ENTRY_POINT_ADDRESS);
//         uint256 money = 10 ether;
//         vm.deal(address(owner),money);
//         vm.deal(address(account),money);
//     }


//     function run() public {
//         console.log("Broadcasting from:", owner);
//         vm.startBroadcast(ownerKey);
//         // entryPoint = new EntryPoint();
//         // account = new MinimalAccount(address(entryPoint),owner);
        
//         address ENTRY_POINT_ADDRESS = 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789;
//         vm.deal(address(ENTRY_POINT_ADDRESS), 1 ether);
// entryPoint = IEntryPoint(ENTRY_POINT_ADDRESS);
// account = new MinimalAccount(address(entryPoint), owner);

//         UserOperation memory userOp;

//         userOp.sender = address(account);
//         userOp.nonce = account.getNonce();
//         userOp.initCode = "";
//         userOp.callData = abi.encodeWithSelector(MinimalAccount.execute.selector, recipient, 0.2 ether, "");
//         userOp.callGasLimit = 100000;
//         userOp.verificationGasLimit = 100000;
//         userOp.preVerificationGas = 21000;
//         userOp.maxFeePerGas = tx.gasprice;
//         userOp.maxPriorityFeePerGas = tx.gasprice;
//         userOp.paymasterAndData = "";
//         // bytes32 userOpHash = keccak256(abi.encode(
//         //     userOp.sender, userOp.nonce, userOp.callData
//         // ));

//         bytes32 userOpHash = entryPoint.getUserOpHash(userOp);
//         bytes32 ethSigned = ECDSA.toEthSignedMessageHash(userOpHash);
//         (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerKey,ethSigned);
//         userOp.signature = abi.encodePacked(r,s,v);
//         // transaction through bundler:
//         vm.deal(owner, 1 ether);
//         entryPoint.depositTo{value: 0.05 ether}(address(account));
//         vm.deal(address(entryPoint), 0.5 ether);
// vm.deal(address(account), 1 ether);
//         UserOperation[] memory ops = new UserOperation[](1);
//         ops[0] = userOp;
    
//         entryPoint.handleOps(ops, payable(owner));
//         vm.stopBroadcast();

//     }

// }








pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {MinimalAccount} from "../contracts/MinimalAccount.sol";
import { IEntryPoint } from "@account-abstraction/contracts/interfaces/IEntryPoint.sol";
import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import { UserOperation } from "@account-abstraction/contracts/interfaces/UserOperation.sol";

contract SendUserOp is Script {
    MinimalAccount public account;
    IEntryPoint public entryPoint;
    address public owner;
    uint256 public ownerKey;
    address public recipient;

    // Sepolia EntryPoint constant
    address constant ENTRY_POINT_ADDRESS = 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789;

    function setUp() public {
        // Owner private key (optional) — only needed if you will broadcast
        if (vm.envExists("PRIVATE_KEY")) {
            ownerKey = vm.envUint("PRIVATE_KEY");
            owner = vm.addr(ownerKey);
        } else {
            // fallback: use a test account (only for simulation)
            (owner, ownerKey) = makeAddrAndKey("owner");
        }

        // Prefer using a real payable recipient when broadcasting, else test
        if (vm.envExists("RECIPIENT")) {
            recipient = vm.envAddress("RECIPIENT");
        } else {
            recipient = makeAddr("recipient");
        }

        // Simulation balances (vm.deal affects the local EVM used by forge script)
        vm.deal(owner, 1 ether);      // fund owner in the simulated EVM
        // note: we will also fund account/entrypoint in run()
    }

    function run() public {
        bool doBroadcast = vm.envExists("BROADCAST") && vm.envBool("BROADCAST");

        if (doBroadcast) {
            console.log("Running in BROADCAST mode - real txs will be sent");

            require(vm.envExists("PRIVATE_KEY"), "Set PRIVATE_KEY for broadcast");
            // startBroadcast with the private key (will sign/send real txs)
            vm.startBroadcast(ownerKey);
        } else {
            console.log("Running in SIMULATION mode (no real txs, no ETH used)");
            // no startBroadcast -> everything runs in ephemeral local EVM
        }

        // Use on-chain EntryPoint address (we treat it as external in simulation)
        entryPoint = IEntryPoint(ENTRY_POINT_ADDRESS);

        // Deploy a fresh MinimalAccount in the ephemeral env (or on-chain if broadcasting)
        account = new MinimalAccount(address(entryPoint), owner);

        // Give some funds so the account can actually send value when execute() runs.
        // In simulation this uses vm.deal. In broadcast mode the tx will actually send these funds from 'owner'.
        vm.deal(address(account), 1 ether);

        // If you want EntryPoint to have a deposit for the account, deposit via EntryPoint
        // This requires the owner to have funds (in broadcast mode this consumes real ETH).
        // We only run depositTo if we are in simulation or broadcast and owner has funds.
        // For simulation vm.deal above suffices; for broadcast we do depositTo (owner must pay).
        if (doBroadcast) {
            // depositTo will take ETH from the owner (broadcasted tx)
            entryPoint.depositTo{value: 0.05 ether}(address(account));
        } else {
            // in simulation we can call depositTo using the local VM's state
            // but since entryPoint is external contract on the fork, we may not be able to call depositTo,
            // so it's fine — we already funded account via vm.deal()
        }

        // Build userOp
        UserOperation memory userOp;
        userOp.sender = address(account);
        userOp.nonce = account.getNonce();
        userOp.initCode = "";
        userOp.callData = abi.encodeWithSelector(
            MinimalAccount.execute.selector,
            recipient,
            0.2 ether,
            ""
        );
        userOp.callGasLimit = 100000;
        userOp.verificationGasLimit = 100000;
        userOp.preVerificationGas = 21000;
        userOp.maxFeePerGas = tx.gasprice;
        userOp.maxPriorityFeePerGas = tx.gasprice;
        userOp.paymasterAndData = "";
        userOp.signature = "0x";

        // Sign userOp with owner's key (works in simulation via vm.sign as well)
        bytes32 userOpHash = entryPoint.getUserOpHash(userOp);
        bytes32 ethSigned = ECDSA.toEthSignedMessageHash(userOpHash);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerKey, ethSigned);
        userOp.signature = abi.encodePacked(r, s, v);

//         // Call EntryPoint::handleOps — in broadcast mode this will be a real on-chain call,
//         // in simulation it will run locally and print logs.
//         UserOperation ;
// ops[0] = userOp;

//         // optional: show debug info
//         console.log("About to call handleOps with account:", address(account));
//         entryPoint.handleOps(ops, payable(owner));



// Call EntryPoint::handleOps — in broadcast mode this will be a real on-chain call,
// in simulation it will run locally and print logs.
// UserOperation ;
UserOperation[] memory ops = new UserOperation[](1);
ops[0] = userOp;

// optional: show debug info
console.log("About to call handleOps with account:", address(account));
entryPoint.handleOps(ops, payable(owner));


        if (doBroadcast) {
            vm.stopBroadcast();
        }
    }
}


