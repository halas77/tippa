// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {Test} from "forge-std/Test.sol";
import {TipJar} from "../src/TipJar.sol";
import {ERC20PermitMock} from "./ERC20PermitMock.sol";

contract TipJarTest is Test {
    TipJar public tipJar;
    ERC20PermitMock public usdc;

    address creator = address(1);
    address tipper;

    string constant creatorName = "Dawit";
    uint256 constant tipAmount = 100 * 1e8;

    function setUp() public {
        usdc = new ERC20PermitMock();
        tipJar = new TipJar(address(usdc), "https://tippa.vercel.app/");

        // Get the correct address from private key
        vm.startPrank(tipper);
        usdc.mint(tipper, tipAmount * 10);
        usdc.approve(address(tipJar), tipAmount * 10);
        vm.stopPrank();
    }

    function testRegisterCreator() public {
        tipJar.registerCreator(creator);
        assertEq(tipJar.creatorBalances(creator), 0);
    }

    function testTipCreator() public {
        tipJar.registerCreator(creator);

        // Get current nonce from token contract
        vm.startPrank(tipper);
        tipJar.tipCreator(creator, tipAmount);
        vm.stopPrank();

        assertEq(usdc.balanceOf(creator), tipAmount);
    }
}
