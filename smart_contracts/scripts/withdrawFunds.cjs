// const { ethers } = require("hardhat");

// async function main() {
//   const paymasterAddress = "0xa06566FfDC42e3725Ae6357d7EE0231C166ec5F7"; // old one jisme ETH pada hai
//   const recipient = "0x7eb5b82f7754cad509a8d13fb4092e1fc77ee951"; // apna wallet jahan ETH chahiye
//   const amount = ethers.parseEther("0.03"); // jitna nikalna hai

//   const [owner] = await ethers.getSigners();
//   console.log("👑 Owner:", owner.address);

//   const Paymaster = await ethers.getContractAt("SmartPaymasterV2", paymasterAddress, owner);

//   const tx = await Paymaster.withdraw(recipient, amount);
//   await tx.wait();

//   console.log(`✅ Withdrawn ${ethers.formatEther(amount)} ETH to: ${recipient}`);
// }

// main().catch((err) => {
//   console.error("❌ Error:", err);
//   process.exit(1);
// });





const { ethers } = require("ethers");
const ENTRYPOINT = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const PAYMASTER = "0xa53dcd3331d048f3bda4b46341e8904df927dacd";

(async () => {
  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const entry = new ethers.Contract(
    ENTRYPOINT,
    ["function deposits(address) view returns (uint256)"],
    provider
  );
  const bal = await entry.deposits(PAYMASTER);
  console.log("Paymaster deposit balance:", ethers.formatEther(bal), "ETH");
})();




