// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {GabruCoin} from "../src/GabruCoin.sol";

contract GabruCoinScript is Script {
    GabruCoin public g;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        g = new GabruCoin(address(this));

        vm.stopBroadcast();
    }
}
