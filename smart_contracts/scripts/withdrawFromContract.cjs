const hre = require("hardhat");

async function main() {
  const CONTRACT = "0x4FA8dA0604c9B085e22950E4530f6f7224bDE256"; // MinimalAccount
  const RECEIVER = "0x9B15Cdc22056967b7455F8756df36CCaDd0CF48F"; // your EOA
  const AMOUNT = hre.ethers.parseEther("0.05");

  const provider = new hre.ethers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/8buZbYFWDbz9Nceec-u8u"
  );
  const PRIVATE_KEY = "0x3b13d4f013969cf50df67b0fc3c5eca162d8f15122d0a84550813888c1b4d5c5";
  const owner = new hre.ethers.Wallet(PRIVATE_KEY, provider);

  const abi = [
    "function execute(address dest, uint256 value, bytes calldata func) external"
  ];

  const contract = new hre.ethers.Contract(CONTRACT, abi, owner);

  console.log(`💸 Withdrawing ${hre.ethers.formatEther(AMOUNT)} ETH to ${RECEIVER}...`);
  const tx = await contract.execute(RECEIVER, AMOUNT, "0x");
  await tx.wait();

  console.log("✅ Withdraw successful! Tx hash:", tx.hash);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
