const hre = require("hardhat");

async function main() {
  const ENTRY_POINT = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"; // Sepolia EntryPoint
  const ACCOUNT = "0x4FA8dA0604c9B085e22950E4530f6f7224bDE256"; // your MinimalAccount

  const provider = new hre.ethers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/8buZbYFWDbz9Nceec-u8u"
  );

  // EntryPoint contract ABI (for balanceOf)
  const ENTRYPOINT_ABI = [
    "function balanceOf(address account) view returns (uint256)",
  ];

  const entryPoint = new hre.ethers.Contract(ENTRY_POINT, ENTRYPOINT_ABI, provider);

  const deposit = await entryPoint.balanceOf(ACCOUNT);
  const balance = await provider.getBalance(ACCOUNT);

  console.log("🔹 MinimalAccount address:", ACCOUNT);
  console.log("💰 Contract ETH balance:", hre.ethers.formatEther(balance), "ETH");
  console.log("🏦 EntryPoint deposit:", hre.ethers.formatEther(deposit), "ETH");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
