const { ethers } = require("hardhat");

async function main() {
    const SMV2_ADDRESS = "0xA53DCd3331d048F3BDA4B46341E8904DF927dAcD";
    const [signer] = await ethers.getSigners();
    const contract = await ethers.getContractAt("SmartPaymasterV2",SMV2_ADDRESS,signer);
    const tx = contract.setFreeTxLimit(10);
}

main().catch((e) => {
    console.log(e);
    process.exit(1);
})