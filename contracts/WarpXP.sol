// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract WarpXP is Ownable {
    mapping(address => uint256) private _xp;
    mapping(address => uint256) private _levels;

    event XPAdded(address indexed user, uint256 amount);
    event LevelUp(address indexed user, uint256 newLevel);

    function addXP(address user, uint256 amount) external onlyOwner {
        _xp[user] += amount;
        _checkLevelUp(user);
        emit XPAdded(user, amount);
    }

    function getXP(address user) public view returns (uint256) {
        return _xp[user];
    }

    function getLevel(address user) public view returns (uint256) {
        return _levels[user];
    }

    function _checkLevelUp(address user) internal {
        uint256 currentXP = _xp[user];
        uint256 currentLevel = _levels[user];
        uint256 xpForNextLevel = 100 * (2 ** currentLevel);

        while (currentXP >= xpForNextLevel) {
            currentXP -= xpForNextLevel;
            currentLevel++;
            xpForNextLevel = 100 * (2 ** currentLevel);
        }

        if (currentLevel > _levels[user]) {
            _levels[user] = currentLevel;
            emit LevelUp(user, currentLevel);
        }
    }
}