// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {StakingContract} from "../src/Staking.sol";
import {GabruCoin} from "../src/GabruCoin.sol";

contract StakingTest is Test {
    StakingContract public s;
    GabruCoin public gc;

    function setUp() public {
        s = new StakingContract(
            address(0),
            address(0x5aE1fbD995B32D2e4C4733D36A45b346E3dABb2E)
        );
        gc = new GabruCoin(address(s));
        s.setTokenAddress(address(gc));
    }

    function testBalanceOf() public {
        s.stake{value: 1 ether}();
        assertEq(s.balanceOf(address(this)), 1 ether);
    }

    function testStake() public {
        vm.startPrank(0xfF1D73Ea47222386fE482BAadb1f3d5755ea55c9);
        vm.deal(0xfF1D73Ea47222386fE482BAadb1f3d5755ea55c9, 10 ether);
        s.stake{value: 1 ether}();
        assertEq(
            s.balanceOf(0xfF1D73Ea47222386fE482BAadb1f3d5755ea55c9),
            1 ether
        );
    }

    function testUnstake() public {
        vm.startPrank(0x5aE1fbD995B32D2e4C4733D36A45b346E3dABb2E);
        vm.deal(0x5aE1fbD995B32D2e4C4733D36A45b346E3dABb2E, 10 ether);
        s.setTokenAddress(address(0xf9DC3845383117AD97488A132bf84031e8376F8a));
        s.stake{value: 1 ether}();
        s.unstake(1 ether);
        vm.stopPrank();
        assertEq(s.balanceOf(0x5aE1fbD995B32D2e4C4733D36A45b346E3dABb2E), 0);
    }

    function test_Revert_StakeFail() public {
        s.stake{value: 0}();
    }

    function testSetTokenAddress() public {
        vm.startPrank(0x5aE1fbD995B32D2e4C4733D36A45b346E3dABb2E);
        s.setTokenAddress(address(0xf9DC3845383117AD97488A132bf84031e8376F8a));
    }
}

// change token to -> 0xf9DC3845383117AD97488A132bf84031e8376F8a
