
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WarpPoints {
    mapping(address => uint256) public points;

    function addPoints(address user, uint256 amount) public {
        points[user] += amount;
    }

    function getPoints(address user) public view returns (uint256) {
        return points[user];
    }
}
