// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {GabruCoin} from "../src/GabruCoin.sol";

contract GabruCoinTest is Test {
    GabruCoin public g;

    function setUp() public {
        g = new GabruCoin(address(this));
    }

    function testInitialTotalSupply() public view {
        assertEq(g.totalSupply(), 0);
    }

    function test_Revert_MintFail() public {
        vm.startPrank(0x5aE1fbD995B32D2e4C4733D36A45b346E3dABb2E);
        g.mint(address(0x5aE1fbD995B32D2e4C4733D36A45b346E3dABb2E), 100);
    }

    function testMint() public {
        g.mint(address(0x5aE1fbD995B32D2e4C4733D36A45b346E3dABb2E), 100);
        assertEq(
            g.balanceOf(address(0x5aE1fbD995B32D2e4C4733D36A45b346E3dABb2E)),
            100
        );
    }

    function testUpdateStakingContact() public {
        g.updateStakingContact(
            address(0x5aE1fbD995B32D2e4C4733D36A45b346E3dABb2E)
        );
        vm.startPrank(0x5aE1fbD995B32D2e4C4733D36A45b346E3dABb2E);
        g.mint(address(0x5aE1fbD995B32D2e4C4733D36A45b346E3dABb2E), 100);
    }
}
