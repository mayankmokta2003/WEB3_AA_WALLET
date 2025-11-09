const { ethers } = require("hardhat");

async function main() {

    const ENTRY_POINT = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
    const MINIMAL_ACCOUNT_ADDRESS = "0x535006AC5CEe48a2e94e3fDd23577D24ab80D1c0";

    const [owner] = await ethers.getSigners();
    console.log("👑 Owner:", owner.address);

    const Factory = await ethers.getContractFactory("SmartPaymasterV2");
    const pm = await Factory.deploy(ENTRY_POINT,owner.address);
    await pm.waitForDeployment();
    const V2DeployedAddress = await pm.getAddress();
    console.log("✅ SmartPaymasterV2:", V2DeployedAddress);

    const tx = await pm.deposit({ value: ethers.parseEther("0.03") });
    await tx.wait();
    console.log("💰 Funded Paymaster with 0.03 ETH in EntryPoint");

    const whiteListTx = await pm.addToWhitelist(MINIMAL_ACCOUNT_ADDRESS);
    await whiteListTx.wait();

    const txLeft = await pm.remainingFreeTx(MINIMAL_ACCOUNT_ADDRESS);
    console.log("tracsactions left are: ", txLeft)

}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});