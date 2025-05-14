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
    uint256 tipperPrivateKey =
        0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a;

    function setUp() public {
        usdc = new ERC20PermitMock();
        tipJar = new TipJar(address(usdc), "https://tippa.vercel.app/");

        // Get the correct address from private key
        tipper = vm.addr(tipperPrivateKey);

        vm.startPrank(tipper);
        usdc.mint(tipper, tipAmount * 10);
        vm.stopPrank();
    }

    function testRegisterCreator() public {
        tipJar.registerCreator(creator);
        assertEq(tipJar.creatorBalances(creator), 0);
    }

    function testTipCreator() public {
        tipJar.registerCreator(creator);

        // Get current nonce from token contract
        uint256 nonce = usdc.nonces(tipper);

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(
            tipperPrivateKey,
            keccak256(
                abi.encodePacked(
                    "\x19\x01",
                    usdc.DOMAIN_SEPARATOR(),
                    keccak256(
                        abi.encode(
                            usdc.PERMIT_TYPEHASH(),
                            tipper,
                            address(tipJar),
                            tipAmount,
                            nonce,
                            block.timestamp + 1 hours
                        )
                    )
                )
            )
        );

        vm.startPrank(tipper);
        tipJar.tipCreator(
            creator,
            tipAmount,
            block.timestamp + 1 hours,
            v,
            r,
            s
        );
        vm.stopPrank();

        assertEq(usdc.balanceOf(creator), tipAmount);
    }
}
