// Spdx-License-Identifier: MIT

pragma solidity ^0.8.28;

import {MinimalAccount} from "./MinimalAccount.sol";

contract AccountFactory {

    event AccountCreated(address indexed owner, address accountAddress);


    function createAccount(address _entryPoint) external returns (address){

        MinimalAccount newAccount = new MinimalAccount(_entryPoint,msg.sender);
        emit AccountCreated(msg.sender,address(newAccount));
        return address(newAccount);

    }

}