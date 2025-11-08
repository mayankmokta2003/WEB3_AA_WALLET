// SPDX-License-Identifier:MIT

pragma solidity ^0.8.28;
// SmartPaymaster deployed at: 0xe739ce37EfFb87503122c4fFC757464F2C9E580a
import {IEntryPoint} from "@account-abstraction/contracts/interfaces/IEntryPoint.sol";
import {IPaymaster} from "@account-abstraction/contracts/interfaces/IPaymaster.sol";
import {UserOperation} from "@account-abstraction/contracts/interfaces/UserOperation.sol";

contract SmartPaymaster is IPaymaster {

    IEntryPoint public immutable entryPoint;
    address public owner;

    mapping(address => bool) public isWhitelisted;

    constructor(IEntryPoint _entryPoint, address _owner) {
        entryPoint = _entryPoint;
        owner = _owner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner,"Only Owner can modify");
        _;
    }

    function validatePaymasterUserOp(UserOperation calldata userOp, bytes32 userOpHash, uint256 maxCost)
    external returns (bytes memory context, uint256 validationData){
        require(isWhitelisted[userOp.sender] , "Not whitelisted");
        return("",0);
    }


    function postOp(PostOpMode mode, bytes calldata context, uint256 actualGasCost) external{}


    function addToWhitelist(address user) external onlyOwner{
        isWhitelisted[user] = true;
    }


    function deposit() external payable onlyOwner{
        entryPoint.depositTo{value: msg.value}(address(this));
    }


    function withdraw(address payable to, uint256 amount) external onlyOwner{
        entryPoint.withdrawTo(to, amount);
    }

}