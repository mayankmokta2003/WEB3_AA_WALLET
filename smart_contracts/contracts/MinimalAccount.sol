// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title MinimalAccount
 * @author Mayank
 * @notice A minimal smart contract wallet supporting:
 *         - Owner-based execution
 *         - Meta-transactions
 *         - ERC-4337 Account Abstraction (EntryPoint)
 * @dev This is NOT a production-ready wallet. Built for learning AA concepts.
 */

import { IEntryPoint } from "@account-abstraction/contracts/interfaces/IEntryPoint.sol";
import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import { UserOperation } from "@account-abstraction/contracts/interfaces/UserOperation.sol";
import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "hardhat/console.sol";


contract MinimalAccount {
    using ECDSA for bytes32;

    /* ========== ERRORS ========== */
    error MA_NotOwner();
    error MA_InvalidNonce();
    error MA_InvalidSignature();
    error MA_ExecutionFailed();
    error MA_NotOwnerOrEntryPoint();

    /* ========== EVENTS ========== */
    event Executed(address indexed target, uint256 value, bytes data);
    event OwnerChanged(address indexed oldOwner, address indexed newOwner);

    /* ========== STATE ========== */
    IEntryPoint private immutable i_entryPoint;
    uint256 private _nonce;
    address public owner;

    /* ========== CONSTRUCTOR ========== */
    constructor(address _entryPoint, address _owner) {
        require(_entryPoint != address(0), "entryPoint-zero");
        require(_owner != address(0), "owner-zero");
        i_entryPoint = IEntryPoint(_entryPoint);
        owner = _owner;
        _nonce = 0;
    }

    /* ========== MODIFIERS ========== */
    modifier onlyOwner() {
        if (msg.sender != owner) revert MA_NotOwner();
        _;
    }

    modifier onlyOwnerOrEntryPoint() {
        if ((msg.sender != owner) && (msg.sender != address(i_entryPoint))) {
            revert MA_NotOwnerOrEntryPoint();
        }
        _;
    }

    /* ========== RECEIVE ========== */
    receive() external payable {}

    /* ========== OWNER ACTIONS ========== */
    function changeOwner(address newOwner) external onlyOwner {
        require(newOwner != address(0), "zero addr");
        emit OwnerChanged(owner, newOwner);
        owner = newOwner;
    }

    /* ========== EXECUTION ========== */
    
    /**
     * @notice Execute a transaction from this account
     * @dev Can be called by owner or EntryPoint
     * @param to Target address
     * @param value ETH to send
     * @param data Calldata
     */

    function execute(address to, uint256 value, bytes calldata data) external onlyOwnerOrEntryPoint returns (bytes memory) {
        (bool success, bytes memory result) = to.call{value: value}(data);
        if (!success) {
            revert MA_ExecutionFailed();
        }
        emit Executed(to, value, data);
        return result;
    }

    /* ========== SIGNATURE / META-TX HELPERS ========== */

    /**
     * @notice Returns the EIP-191 message hash for signing
     * @dev Includes contract address to prevent cross-account replay
     */

    function getMessageHash(address to, uint256 value, bytes calldata data, uint256 nonce_) public view returns (bytes32) {
        // binding to this contract address prevents replay across accounts
        bytes32 hash = keccak256(abi.encodePacked(address(this), to, value, data, nonce_));
        return hash.toEthSignedMessageHash();
    }

    /// @notice Verify signature against owner
    function verifySignature(address to, uint256 value, bytes calldata data, uint256 nonce_, bytes calldata signature) public view returns (bool) {
        bytes32 ethSigned = getMessageHash(to, value, data, nonce_);
        address signer = ethSigned.recover(signature);
        return signer == owner;
    }

    /**
     * @notice Execute a meta-transaction using owner's signature
     * @dev Relayer pays gas
     */

    function executeWithSignature(address to, uint256 value, bytes calldata data, uint256 nonce_, bytes calldata signature) external returns (bytes memory) {
        if (nonce_ != _nonce) {
            revert MA_InvalidNonce();
        }
        if (!verifySignature(to, value, data, nonce_, signature)) {
            revert MA_InvalidSignature();
        }

        // increment nonce before external call to prevent reentrancy replay
        _nonce++;

        (bool success, bytes memory result) = to.call{value: value}(data);
        if (!success) {
            revert MA_ExecutionFailed();
        }
        emit Executed(to, value, data);
        return result;
    }

    /* ========== ACCOUNT ABSTRACTION CORE ========== */

/**
     * @notice Validate a UserOperation (ERC-4337)
     * @dev Called ONLY by EntryPoint
     * @param userOp The user operation struct
     * @param userOpHash Hash of the user operation
     * @param missingAccountFunds ETH needed for prefund
     * @return validationData 0 if valid
     */

function validateUserOp(
    UserOperation calldata userOp,
    bytes32 userOpHash,
    uint256 missingAccountFunds
)
    external
    returns (uint256)
{
    console.log("validateUserOp called by", msg.sender);
    console.log("missingAccountFunds:", missingAccountFunds);
    console.log("contract balance:", address(this).balance);

    bytes32 ethSignedMessageHash = ECDSA.toEthSignedMessageHash(userOpHash);
    address signer = ECDSA.recover(ethSignedMessageHash, userOp.signature);
    console.log("Recovered signer:", signer);
    console.log("Owner:", owner);

    require(signer == owner, "Invalid signature");

    if (missingAccountFunds > 0) {
        uint256 amountToSend = missingAccountFunds > address(this).balance
            ? address(this).balance
            : missingAccountFunds;
        (bool success,) = payable(msg.sender).call{value: amountToSend}("");
        require(success, "Failed to send missing funds");
    }

    return 0;
}


    /* ========== GETTERS ========== */
    function entryPoint() external view returns (IEntryPoint) {
        return i_entryPoint;
    }

    function getNonce() external view returns (uint256) {
        return _nonce;
    }
}
