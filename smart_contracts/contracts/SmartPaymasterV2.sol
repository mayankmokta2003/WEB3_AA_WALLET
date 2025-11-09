// SPDX-License-Identifier:MIT

pragma solidity ^0.8.28;
// ✅ SmartPaymasterV2: 0xA53DCd3331d048F3BDA4B46341E8904DF927dAcD
import {IEntryPoint} from "@account-abstraction/contracts/interfaces/IEntryPoint.sol";
import {IPaymaster} from "@account-abstraction/contracts/interfaces/IPaymaster.sol";
import {UserOperation} from "@account-abstraction/contracts/interfaces/UserOperation.sol";

contract SmartPaymasterV2 is IPaymaster {


    event Whitelisted(address indexed sender, bool allowed);
    event LimitChanged(uint256 newLimit);
    event OwnerChanged(address indexed newOwner);
    event Deposited(uint256 value);
    event Withdrawn(address indexed to, uint256 amount);
    event Consumed(address indexed sender,uint256 usedTx, uint256 remainingTx);


    mapping(address => bool) public isWhitelisted;
    mapping(address => uint256) public usedFreeTx;
    uint256 public freeTxLimit = 3;
    IEntryPoint public immutable entryPoint;
    address public owner;


    constructor(IEntryPoint _entryPoint, address _owner) {
        entryPoint = _entryPoint;
        owner = _owner;
    }


    modifier onlyOwner() {
        require(msg.sender == owner, "NOT OWNER");
        _;
    }

    modifier onlyEntryPoint() {
        require(msg.sender == address(entryPoint),"ONLY ENTRYPOINT");
        _;
    }


    function validatePaymasterUserOp(UserOperation calldata userOp, bytes32 userOpHash, uint256 maxCost)
    external returns (bytes memory context, uint256 validationData){
        require(isWhitelisted[userOp.sender] == true, "Not Whitelisted!!");
        require(usedFreeTx[userOp.sender] < freeTxLimit,"No free tx trials left");
        return(abi.encode(userOp.sender),0);
    }
   
    
    function postOp(PostOpMode mode, bytes calldata context, uint256 actualGasCost) external onlyEntryPoint{
        // here if tx went through then only add txused.
        if(mode == PostOpMode.opSucceeded){
            address sender = abi.decode(context, (address));
            unchecked {
                usedFreeTx[sender] += 1;
            }
            emit Consumed(sender,usedFreeTx[sender],remainingFreeTx(sender));
        }
    }


    /* -------------------- Admin / owner controls -------------------- */


    function addToWhitelist(address sender) external onlyOwner{
        isWhitelisted[sender] = true;
        emit Whitelisted(sender,true);
    }


    function removeFromWhitelist(address sender) external onlyOwner{
        isWhitelisted[sender] = false;
        emit Whitelisted(sender,false);
    }


    function setFreeTxLimit(uint256 newLimit) external onlyOwner{
        freeTxLimit = newLimit;
        emit LimitChanged(newLimit);
    }


    function setOwner(address newOwner) external {
        owner = newOwner;
        emit OwnerChanged(newOwner);
    }


    function deposit() external payable{
        entryPoint.depositTo{value: msg.value}(address(this));
        emit Deposited(msg.value);
    }


    function withdraw(address payable to, uint256 amount) external onlyOwner {
        entryPoint.withdrawTo(to,amount);
        emit Withdrawn(to, amount);
    }


    /* ------------------------ View helpers -------------------------- */


    function remainingFreeTx(address sender) public view returns(uint256){
        uint256 used = usedFreeTx[sender];
        uint256 limit = freeTxLimit;
        return used >= limit ? 0 : (limit - used);
    }


    function info(address sender) external view returns(bool whitelisted, uint256 used, uint256 limit, uint256 remaining) {
        whitelisted = isWhitelisted[sender];
        used = usedFreeTx[sender];
        limit = freeTxLimit;
        remaining = remainingFreeTx(sender);
    }


}


