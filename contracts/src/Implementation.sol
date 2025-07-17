// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Implementation {
    uint256 public totalStakeAmount;
    mapping(address => uint256) public stakingBalances;

    function stake() public payable {
        require(msg.value > 0, "Staking amount must be greater than 0");
        totalStakeAmount += msg.value;
        stakingBalances[msg.sender] += msg.value;
    }

    function unstake(uint256 amount) public {
        uint256 refund = amount / 2;
        require(amount > 0, "Amount must be greater than 0");
        require(
            stakingBalances[msg.sender] >= refund,
            "Not enough balance to unstake"
        );
        payable(msg.sender).transfer(refund);
        stakingBalances[msg.sender] -= refund;
        totalStakeAmount -= refund;
    }
}
