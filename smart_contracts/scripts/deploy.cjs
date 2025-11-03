const hre = require("hardhat");

async function main() {
    const MinimalAccount = await hre.ethers.getContractFactory("MinimalAccount");
    // sepolia official entrypoint address:
    const entryPointAddress = "0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789";
    const [deployer] = await hre.ethers.getSigners();
    const minimalAccount = await MinimalAccount.deploy(entryPointAddress,deployer.address);

    await minimalAccount.waitForDeployment();
    console.log("MinimalAccount deployed at:", await minimalAccount.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});