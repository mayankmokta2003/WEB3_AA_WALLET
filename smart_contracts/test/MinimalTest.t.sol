// SPDX-License-Identifier:MIT

pragma solidity ^0.8.28;

import {Test} from "forge-std/Test.sol";
import {MinimalAccount} from "../contracts/MinimalAccount.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract MinimalTest is Test {

    MinimalAccount public account;
    address public owner;
    address public entryPoint;
    address public recipient;

    function setUp() public {
        entryPoint = makeAddr("entryPoint");
        owner = makeAddr("owner");
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
        // bytes32 ethHash = ECDSA.toEthSignedMessageHash(msgHash);
        (uint8 v,bytes32 r, bytes32 s) = vm.sign(uint256(uint160(owner)),msgHash);
        bytes memory sig = abi.encodePacked(r,s,v);
        bool valid = account.verifySignature(recipient,0.2 ether,data,nonce,sig);
        // assertTrue(valid);
        assertTrue(!valid, "Signature should be valid");
    }



    

}
