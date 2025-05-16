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
// Deployed to: 0xc6311f0560e9B47EED500D8c8542036F044fabBF
// Transaction hash: 0x3eb2ffbaf4599cfc5a1f3a60c97d73b8f0ec32c777158de9a01dee55c270f275
