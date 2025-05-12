// contracts/WarpPoints.sol
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WarpPoints is ERC20, Ownable {
    mapping(address => uint256) public lastClaim;
    mapping(address => uint256) public streaks;
    mapping(address => uint256) public xp;  // 👈 Ny XP-mapping
    
    uint256 public dailyReward = 100 * 10**18;
    uint256 public xpPerClaim = 10;         // 👈 XP per claim

    constructor() ERC20("WarpPoints", "WARP") {}

    function claimDaily() external {
        require(block.timestamp - lastClaim[msg.sender] >= 1 days, "Wait 24h");
        
        // Streak-logik
        streaks[msg.sender] = block.timestamp - lastClaim[msg.sender] <= 2 days 
            ? streaks[msg.sender] + 1 
            : 1;
        
        _mint(msg.sender, dailyReward * streaks[msg.sender]);
        xp[msg.sender] += xpPerClaim * streaks[msg.sender];  // 👈 Ge XP
        lastClaim[msg.sender] = block.timestamp;
    }

    // Admin-funktion för XP-justering
    function setXpPerClaim(uint256 _xp) external onlyOwner {
        xpPerClaim = _xp;
    }
}