// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { IEntryPoint } from "@account-abstraction/contracts/interfaces/IEntryPoint.sol";
import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

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
        // if ((msg.sender != owner) && (msg.sender != address(i_entryPoint))) {
        //     revert MA_NotOwnerOrEntryPoint();
        // }
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
    /// @notice Execute a call (owner or entryPoint)
    function execute(address to, uint256 value, bytes calldata data) external onlyOwnerOrEntryPoint returns (bytes memory) {
        (bool success, bytes memory result) = to.call{value: value}(data);
        if (!success) {
            revert MA_ExecutionFailed();
        }
        emit Executed(to, value, data);
        return result;
    }

    /* ========== SIGNATURE / META-TX HELPERS ========== */

    /// @notice returns EIP-191 prefixed message hash to sign off-chain
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

    /// @notice Execute a signed meta-transaction (relayer pays gas)
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

    /* ========== GETTERS ========== */
    function entryPoint() external view returns (IEntryPoint) {
        return i_entryPoint;
    }

    function getNonce() external view returns (uint256) {
        return _nonce;
    }
}
