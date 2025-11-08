const { ethers } = require("hardhat");

async function main() {

    const[deployer] = await ethers.getSigners();
    console.log("Deploying paymaster with account:",deployer.address);

    const ENTRY_POINT_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
    const Paymaster = await ethers.getContractFactory("SimplePaymaster");
    const paymaster = await Paymaster.deploy(ENTRY_POINT_ADDRESS);
    await paymaster.waitForDeployment();

    console.log("✅ Paymaster deployed at:", await paymaster.getAddress());

    // const tx = await paymaster.deposit({ value: ethers.parseEther("0.05") });
    // await tx.wait();
    // console.log("💰 Deposited 0.05 ETH into EntryPoint for Paymaster");

    // console.log("🎯 Deployment Completed Successfully!");

}

main().catch((e) => {
    console.log(e);
    process.exit(1);
})