
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WarpXP {
    mapping(address => uint256) public xp;

    function claimXP() public {
        xp[msg.sender] += 100;
    }

    function getXP(address user) public view returns (uint256) {
        return xp[user];
    }
}
