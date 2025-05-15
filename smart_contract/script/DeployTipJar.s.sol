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

// forge create --rpc-url $BASE_SEPOLIA_RPC --private-key $PRIVATE_KEY src/TipJar.sol:TipJar --broadcast   --constructor-args 0x036CbD53842c5426634e7929541eC2318f3dCF7e "https://tippa.vercel.app/"

// Deployer: 0xD4517B0EaddDED64bA75A65E67e2CEb1B6B0f4Fe
// Deployed to: 0x89aAc05C68Ad149028169a040e7EE1bf720a7A2A
// Transaction hash: 0x3f9449efdf521643cfa315a0230728bb20b7fc6eacb5c8f7d68a10387487daab
