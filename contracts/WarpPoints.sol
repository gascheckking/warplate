// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./FrameValidator.sol";
import "./WarpXP.sol";

contract WarpPoints is ERC20 {
    FrameValidator private _validator;
    WarpXP private _warpXP;

    mapping(address => uint256) public lastClaim;
    mapping(address => uint256) public streaks;

    constructor(
        address validatorAddress,
        address warpXPAddress
    ) ERC20("WarpPoints", "WARP") {
        _validator = FrameValidator(validatorAddress);
        _warpXP = WarpXP(warpXPAddress);
    }

    function claimDaily(bytes calldata frameProof) external {
        require(_validator.validateFrame(msg.sender, bytes32(frameProof)), "Invalid frame");
        require(block.timestamp - lastClaim[msg.sender] >= 1 days, "Wait 24h");

        streaks[msg.sender] = block.timestamp - lastClaim[msg.sender] <= 2 days 
            ? streaks[msg.sender] + 1 
            : 1;

        _mint(msg.sender, 100 * 10**18 * streaks[msg.sender]);
        _warpXP.addXP(msg.sender, 10 * streaks[msg.sender]);
        lastClaim[msg.sender] = block.timestamp;
    }
}