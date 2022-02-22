// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const ethers = require("ethers");
require("dotenv").config();

const {
  CHAINLINK,
} = require("../config");

const network = process.env.NETWORK;

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  console.log("start deploying")

  // We get the contract to deploy
  const PriceFeed = await hre.ethers.getContractFactory("PriceFeed");
  const priceFeed = await PriceFeed.deploy(
    CHAINLINK[network].linkToken,
    CHAINLINK[network].oracle,
    CHAINLINK[network].jobId
  );

  await priceFeed.deployed();

  console.log("PriceFeed deployed to:", priceFeed.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
