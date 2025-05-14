// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/TipJar.sol";

contract DeployTipJar is Script {
    function run() external {
        // load vars
        address tokenAddr = 0x036CbD53842c5426634e7929541eC2318f3dCF7e;
        string memory baseURI = "https://tippa.vercel.app/";

        // start broadcast with your PRIVATE_KEY
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerKey);

        // deploy
        TipJar tipJar = new TipJar(tokenAddr, baseURI);

        vm.stopBroadcast();

        // print out the address
        console.log("TipJar deployed to:", address(tipJar));
    }
}

// contract - 0x782fF4C029a798C2A354dFb5A1C49CbEDcfCEDf8
// tnxHash - 0x8114eb22b4473d95a5f2a764bc12c365a0d12357550732d3a2b4fa64650ef54b
// deployer -  0xD4517B0EaddDED64bA75A65E67e2CEb1B6B0f4Fe
