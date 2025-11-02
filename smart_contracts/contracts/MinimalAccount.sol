// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { IEntryPoint } from "@account-abstraction/contracts/interfaces/IEntryPoint.sol";


contract MinimalAccount {

  IEntryPoint private immutable i_entryPoint;

  constructor(address _entryPoint) {
    i_entryPoint = IEntryPoint(_entryPoint);
  }

  receive() external payable{}

  function entryPoint() external view returns(IEntryPoint){
    return i_entryPoint;
  }

}


