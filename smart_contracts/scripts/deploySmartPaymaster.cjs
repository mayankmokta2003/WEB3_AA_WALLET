const { ethers } = require("hardhat");

async function main() {

    const [deployer] = await ethers.getSigners();
    console.log("🚀 Deploying SmartPaymaster with owner:", deployer.address);
    const ENTRY_POINT = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

    const Paymaster = await ethers.getContractFactory("SmartPaymaster");
    const paymaster = await Paymaster.deploy(ENTRY_POINT,deployer.address);
    await paymaster.waitForDeployment();

    const paymasterAddress = await paymaster.getAddress();
    console.log("✅ SmartPaymaster deployed at:",paymasterAddress);

    const tx = await paymaster.deposit({ value: ethers.parseEther("0.02") });
    await depositTx.wait();
    console.log("💰 Funded Paymaster with 0.05 ETH in EntryPoint");

    const MinimalAccountAddress = "0x535006AC5CEe48a2e94e3fDd23577D24ab80D1c0";
    const whiteListTx = await paymaster.addToWhitelist(MinimalAccountAddress);
    await whiteListTx.wait();
    console.log("🎟️ Whitelisted SmartAccount:", smartAccountAddress);

    console.log("🎯 SmartPaymaster setup completed successfully!");

}
main().catch((e) => {
    console.error(e);
    process.exit(1);
})