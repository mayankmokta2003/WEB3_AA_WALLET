const hre = require("hardhat");

async function main() {
    const MinimalAccount = await hre.ethers.getContractFactory("MinimalAccount");
    // sepolia official entrypoint address:
    const ENTRY_POINT_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
    const minimalAccount = await MinimalAccount.deploy(ENTRY_POINT_ADDRESS);

    await minimalAccount.waitForDeployment();
    console.log(`✅ MinimalAccount deployed at: ${await minimalAccount.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});