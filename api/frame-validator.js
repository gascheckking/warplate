// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FrameValidator {
    address private _owner;
    mapping(bytes32 => bool) private _approvedHashes;

    constructor() {
        _owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Not authorized");
        _;
    }

    function validateFrame(
        address user, 
        bytes32 frameHash
    ) external view returns (bool) {
        return _approvedHashes[keccak256(abi.encodePacked(user, frameHash))];
    }

    function approveFrame(
        address user, 
        bytes32 frameHash
    ) external onlyOwner {
        _approvedHashes[keccak256(abi.encodePacked(user, frameHash))] = true;
    }
}