const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const AccountFactory = await ethers.getContractFactory("AccountFactory");
    const accountFactory = await AccountFactory.deploy();
    await accountFactory.waitForDeployment();
    console.log(`✅ AccountFactory deployed to: ${accountFactory.target}`);
}


main().catch((error) => {
    console.error(error);
    process.exit(1);
  });