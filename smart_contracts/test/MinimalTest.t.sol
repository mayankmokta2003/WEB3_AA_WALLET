// SPDX-License-Identifier:MIT

pragma solidity ^0.8.28;

import {Test} from "forge-std/Test.sol";
import {MinimalAccount} from "../contracts/MinimalAccount.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import { UserOperation } from "@account-abstraction/contracts/interfaces/UserOperation.sol";

contract MinimalTest is Test {

    MinimalAccount public account;
    address public owner;
    address public entryPoint;
    address public recipient;
    uint256 public ownerKey;

    function setUp() public {
        entryPoint = makeAddr("entryPoint");
        (owner,ownerKey) = makeAddrAndKey("owner");
        recipient = makeAddr("recipient");
        vm.deal(owner,10 ether);
        

        account = new MinimalAccount(entryPoint,owner);
        vm.deal(address(account), 10 ether);
        // (bool ok, ) = address(account).call{value: 1 ether}("");
        // require(ok, "funding failed");
    }

    function testOwnerCanExecute() public {
        vm.startPrank(owner);
        uint256 startingBalance = recipient.balance;
        account.execute(recipient, 0.1 ether, "");
        uint256 endingBalance = recipient.balance;
        assertEq(endingBalance - startingBalance , 0.1 ether);
    }


    function testNonOwnerExecuteReverts() public {
        address attacker = makeAddr("attacker");
        vm.prank(attacker);
        vm.expectRevert();
        account.execute(recipient, 0.1 ether, "");
    }




    function testVerifySignatureFunction() public view {
        bytes memory data = "";
        uint256 nonce = account.getNonce();

        bytes32 msgHash = account.getMessageHash(recipient,0.2 ether,data,nonce);
        (uint8 v,bytes32 r, bytes32 s) = vm.sign(ownerKey,msgHash);
        bytes memory sig = abi.encodePacked(r,s,v);
        bool valid = account.verifySignature(recipient,0.2 ether,data,nonce,sig);
        // assertTrue(valid);
        assertTrue(valid);
    }


    function testExecuteWithSignatureFunction() public {
        bytes memory data = "";
        uint256 value = 0.2 ether;
        uint256 nonce = account.getNonce();

        bytes32 msgHash = account.getMessageHash(recipient, value, data, nonce);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerKey,msgHash);
        bytes memory sig = abi.encodePacked(r,s,v);
        uint256 beforeBalance = recipient.balance;
        bytes memory result = account.executeWithSignature(recipient,value,data,nonce,sig);
        uint256 afterBalance = recipient.balance;
        assertEq(afterBalance - beforeBalance , value);
    }

    function testOnlyOwnerCanChangeOwner() public {
        address attacker = makeAddr("attacker");
        vm.prank(attacker);
        vm.expectRevert(MinimalAccount.MA_NotOwner.selector);
        account.changeOwner(recipient);
    }


     /* ========== VALIDATEUSEROP TESTS ========== */

//     struct UserOperation {
//     address sender;
//     uint256 nonce;
//     bytes initCode;
//     bytes callData;
//     uint256 callGasLimit;
//     uint256 verificationGasLimit;
//     uint256 preVerificationGas;
//     uint256 maxFeePerGas;
//     uint256 maxPriorityFeePerGas;
//     bytes paymasterAndData;
//     bytes signature;
// }

    // function testValidateUserOp_ValidSignature() public {
    //     uint256 value = 0.2 ether;
    //     UserOperation memory userOp;
    //     userOp.sender = address(account);
    //     userOp.callData = "";
    //     userOp.nonce = account.getNonce();

    //     bytes32 userOpHash = keccak256((abi.encode(userOp.sender,userOp.callData,userOp.nonce)));
    //     bytes32 msgHash = ECDSA.toEthSignedMessageHash(userOpHash);

    //     (uint8 v,bytes32 r,bytes32 s) = vm.sign(ownerKey,msgHash);
    //     // userOp.signature = abi.encodePacked(r,s,v);
    //     userOp.signature = bytes.concat(r, s, bytes1(v));
     
    //     vm.prank(entryPoint);
    //     uint256 result = account.validateUserOp(userOp,msgHash,value);
    //     assertEq(result,0);
    // }


 

    




    


   



    



}
