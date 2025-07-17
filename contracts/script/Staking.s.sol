// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {StakingContract} from "../src/Staking.sol";
import {GabruCoin} from "../src/GabruCoin.sol";

contract StakingScript is Script {
    StakingContract public s;
    GabruCoin public gc;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        s = new StakingContract(address(0), msg.sender);
        gc = new GabruCoin(address(s));
        s.setTokenAddress(address(gc));
        console.log("StakingContract:", address(s));
        console.log("GabruCoin:", address(gc));

        vm.stopBroadcast();
    }
}
