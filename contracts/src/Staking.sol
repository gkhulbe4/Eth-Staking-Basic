// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {GabruCoin} from "./GabruCoin.sol";

contract StakingContract {
    mapping(address => uint256) public stakingBalances;
    mapping(address => uint256) public lastUpdateTime;
    mapping(address => uint256) public unclaimedRewards;

    GabruCoin public gc;
    address owner;
    constructor(address _tokenAddress, address _owner) {
        gc = GabruCoin(_tokenAddress);
        owner = _owner;
    }

    function stake() public payable {
        require(msg.value > 0, "Staking amount must be greater than 0");
        if (lastUpdateTime[msg.sender] == 0) {
            lastUpdateTime[msg.sender] = block.timestamp;
        } else {
            uint256 timeDiff = block.timestamp - lastUpdateTime[msg.sender];
            uint256 newReward = (timeDiff * stakingBalances[msg.sender]) / 100;
            unclaimedRewards[msg.sender] += newReward;
        }
        stakingBalances[msg.sender] += msg.value;
    }

    function unstake(uint256 amount) public {
        require(
            stakingBalances[msg.sender] >= amount,
            "Not enough balance to unstake"
        );
        uint256 timeDiff = block.timestamp - lastUpdateTime[msg.sender];
        uint256 newReward = (timeDiff * stakingBalances[msg.sender]) / 1000;
        unclaimedRewards[msg.sender] += newReward;
        lastUpdateTime[msg.sender] = block.timestamp;

        payable(msg.sender).transfer(amount);
        gc.mint(msg.sender, unclaimedRewards[msg.sender]);
        unclaimedRewards[msg.sender] = 0;
        stakingBalances[msg.sender] -= amount;
    }

    function getRewards(address account) public view returns (uint256) {
        uint256 currentReward = unclaimedRewards[account];
        uint256 lastUpdate = lastUpdateTime[account];
        uint256 currentTime = block.timestamp;
        uint256 timeDiff = currentTime - lastUpdate;
        uint256 newReward = (timeDiff * stakingBalances[account]) / 1000;
        uint256 totalReward = currentReward + newReward;
        return totalReward;
    }

    function claimReward() public {
        uint256 currentReward = unclaimedRewards[msg.sender];
        uint256 lastUpdate = lastUpdateTime[msg.sender];
        uint256 currentTime = block.timestamp;
        uint256 timeDiff = currentTime - lastUpdate;
        uint256 newReward = (timeDiff * stakingBalances[msg.sender]) / 1000;
        uint256 totalReward = currentReward + newReward;

        gc.mint(msg.sender, totalReward);

        unclaimedRewards[msg.sender] = 0;
        lastUpdateTime[msg.sender] = block.timestamp;
    }

    function balanceOf(address account) public view returns (uint256) {
        return stakingBalances[account];
    }

    function setTokenAddress(address tokenAddress) public {
        require(msg.sender == owner, "You are not authorized");
        gc = GabruCoin(tokenAddress);
    }
}

// fallback() external {
//     (bool success, ) = implementation.delegatecall(msg.data);
//     require(success, "Delegatecall failed");
// }

// function stake() public payable {
//     require(msg.value > 0, "Staking amount must be greater than 0");
//     totalStakeAmount += msg.value;
//     stakingBalances[msg.sender] += msg.value;
// }

// function unstake(uint256 amount) public {
//     uint256 refund = amount / 2;
//     require(amount > 0, "Amount must be greater than 0");
//     require(
//         stakingBalances[msg.sender] >= refund,
//         "Not enough balance to unstake"
//     );
//     payable(msg.sender).transfer(refund);
//     stakingBalances[msg.sender] -= refund;
//     totalStakeAmount -= refund;
// }
