// SPDX-License-Identifier:MIT

pragma solidity ^0.8.28;
// Paymaster deployed at: 0x8C6088deF19254480FB867049CE68A8b50009BaD
import {IEntryPoint} from "@account-abstraction/contracts/interfaces/IEntryPoint.sol";
import {IPaymaster} from "@account-abstraction/contracts/interfaces/IPaymaster.sol";
import {UserOperation} from "@account-abstraction/contracts/interfaces/UserOperation.sol";

contract SimplePaymaster is IPaymaster{

    IEntryPoint public immutable entryPoint;

    constructor(IEntryPoint _entryPoint ) {
        entryPoint = _entryPoint;
    }

    function validatePaymasterUserOp(
        UserOperation calldata, 
        bytes32, 
        uint256
    ) external pure returns (bytes memory context, uint256 validationData) {
        // Approve all transactions
        return ("", 0);
    }

    // Called by EntryPoint after tx execution to charge gas
    function postOp(
        PostOpMode,
        bytes calldata,
        uint256
    ) external pure override {
        // nothing to do
    }

    // Deposit ETH in EntryPoint so Paymaster can pay gas
    function deposit() external payable{
        entryPoint.depositTo{value: msg.value}(address(this));
    }





}