const { ethers } = require("hardhat");

async function main() {
  const paymasterAddress = "0x7f0B1C9F27d426e1cbAbCB98FC4EEd73C65F35e1"; // old one jisme ETH pada hai
  const recipient = "0x7eb5b82f7754cad509a8d13fb4092e1fc77ee951"; // apna wallet jahan ETH chahiye
  const amount = ethers.parseEther("0.02"); // jitna nikalna hai

  const [owner] = await ethers.getSigners();
  console.log("👑 Owner:", owner.address);

  const Paymaster = await ethers.getContractAt("SmartPaymasterV2", paymasterAddress, owner);

  const tx = await Paymaster.withdraw(recipient, amount);
  await tx.wait();

  console.log(`✅ Withdrawn ${ethers.formatEther(amount)} ETH to: ${recipient}`);
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});





