// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract GabruCoin is ERC20, Ownable {
    address stakingContract;
    constructor(
        address _stakingContract
    ) ERC20("GabruCoin", "GB") Ownable(msg.sender) {
        stakingContract = _stakingContract;
    }

    function mint(address to, uint256 amount) public {
        require(msg.sender == stakingContract, "You are not authorized");
        _mint(to, amount);
    }

    function updateStakingContact(address _stakingContract) public onlyOwner {
        stakingContract = _stakingContract;
    }
}
