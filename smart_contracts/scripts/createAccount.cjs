// const hre = require("hardhat");

// async function main() {

//     // through this we can talk to already deployed contracts (getContractAt) fa is where its deployed
//     const factoryAddress = "0xd4feE531618Ca50dE0969F7F75529586b331a6f0";
//     const factory = await hre.ethers.getContractAt("AccountFactory",factoryAddress);

//     // get the signer account address eg ui mai jo call krega create account.
//     const [deployer] = await hre.ethers.getSigners();
//     console.log("Creating new MinimalAccount from factory...");

//     // Create a new account for deployer and next line tx data
//     const ENTRYPOINT = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
//     const tx = await factory.createAccount(ENTRYPOINT);
//     const receipt = await tx.wait();

//     // get the deployed account address (usually emitted in event)
//     const event = receipt.events.find((e) => e.event == "AccountCreated");
//     const accountAddress = event.args[0];

//     console.log(`✅ New MinimalAccount created at: ${accountAddress}`);

// }

// main().catch((error) => {
//     console.error(error);
//     process.exit = 1;
// });






const hre = require("hardhat");

async function main() {
  const factoryAddress = "0xd4feE531618Ca50dE0969F7F75529586b331a6f0";
  const factory = await hre.ethers.getContractAt("AccountFactory", factoryAddress);

  const [deployer] = await hre.ethers.getSigners();
  console.log("Creating new MinimalAccount from factory...");

  const ENTRYPOINT = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
  const tx = await factory.createAccount(ENTRYPOINT);
  const receipt = await tx.wait();

  // ✅ New ethers v6 style (events decoded properly)
  const event = receipt.logs
    .map((log) => {
      try {
        return factory.interface.parseLog(log);
      } catch (e) {
        return null;
      }
    })
    .filter((parsed) => parsed && parsed.name === "AccountCreated")[0];

  if (!event) {
    console.log("⚠️ No AccountCreated event found — check factory redeployment or network.");
    return;
  }

  const newAccountAddress = event.args.accountAddress;
  console.log(`✅ New MinimalAccount created at: ${newAccountAddress}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
