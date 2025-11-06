const hre = require("hardhat");

async function main() {
  const CONTRACT = "0x4FA8dA0604c9B085e22950E4530f6f7224bDE256"; // MinimalAccount

  const abi = [
    "function owner() public view returns (address)"
  ];

  const provider = new hre.ethers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/8buZbYFWDbz9Nceec-u8u"
  );

  const contract = new hre.ethers.Contract(CONTRACT, abi, provider);
  const owner = await contract.owner();

  console.log("👑 Owner of MinimalAccount:", owner);
}

main().catch(console.error);
