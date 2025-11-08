// only redeploy this when we want to add new user to whitelist a new use so he could use paymaster

const { ethers } = require("hardhat");

async function main() {

    const MinimalAccountAddress = "0x535006AC5CEe48a2e94e3fDd23577D24ab80D1c0";
    const SmartPaymasterAddress = "0xe739ce37EfFb87503122c4fFC757464F2C9E580a";
    const [signer] = await ethers.getSigners();
    const contract = await ethers.getContractAt("SmartPaymaster",SmartPaymasterAddress,signer);

    const tx = await contract.addToWhitelist(MinimalAccountAddress);
    await tx.wait();
    console.log(`✅ Whitelisted SmartAccount: ${MinimalAccountAddress}`);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
})