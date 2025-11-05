// // https://api.pimlico.io/v2/sepolia/rpc?apikey=pim_bHDSBUCDUVi6u2MStWMcZT

// import { ethers } from "ethers";
// import { MINIMAL_ACCOUNT_ABI } from "./constants";

// const PIMLICO_BUNDLER =
//   "https://api.pimlico.io/v2/sepolia/rpc?apikey=pim_bHDSBUCDUVi6u2MStWMcZT";
// const ENTRY_POINT = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

// export async function buildUserOp(
//   provider,
//   signer,
//   senderAddress,
//   target,
//   value
// ) {
//   const accountContract = new ethers.Contract(
//     senderAddress,
//     MINIMAL_ACCOUNT_ABI,
//     signer
//   );
//   const callData = accountContract.interface.encodeFunctionData("execute", [
//     target,
//     value,
//     "0x",
//   ]);

//   const userOp = {
//     sender: senderAddress,
//     nonce: await provider.getTransactionCount(senderAddress),
//     initCode: "0x",
//     callData: callData,
//     callGasLimit: 100000,
//     verificationGasLimit: 100000,
//     preVerificationGas: 21000,
//     maxFeePerGas: ethers.parseUnits("20", "gwei"),
//     maxPriorityFeePerGas: ethers.parseUnits("2", "gwei"),
//     paymasterAndData: "0x",
//     signature: "0x",
//   };

//   const userOpHash = ethers.keccak256(ethers.toUtf8Bytes(JSON.stringify(userOp)));
//   const signature = await signer.signMessage(ethers.getBytes(userOpHash));
//   userOp.signature = signature;

//   // 5️⃣ Send to Pimlico bundler
//   const res = await fetch(PIMLICO_BUNDLER, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       jsonrpc: "2.0",
//       id: 1,
//       method: "eth_sendUserOperation",
//       params: [userOp, ENTRY_POINT_ADDRESS],
//     }),
//   });

//   const data = await res.json();
//   console.log("Bundler response:", data);
//   return data;


// }






// https://api.pimlico.io/v2/sepolia/rpc?apikey=pim_bHDSBUCDUVi6u2MStWMcZT


import { ethers } from "ethers";
import { MINIMAL_ACCOUNT_ABI } from "./constants";

const PIMLICO_BUNDLER =
  "https://api.pimlico.io/v2/sepolia/rpc?apikey=pim_bHDSBUCDUVi6u2MStWMcZT";
const ENTRY_POINT = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

function safeStringify(obj) {
  return JSON.stringify(obj, (_, v) => (typeof v === "bigint" ? v.toString() : v));
}
const toHex = (n) => ethers.toBeHex(n);

export async function buildUserOp(provider, signer, senderAddress, target, value) {
  const accountContract = new ethers.Contract(senderAddress, MINIMAL_ACCOUNT_ABI, provider);
  const callData = accountContract.interface.encodeFunctionData("execute", [target, value, "0x"]);

  // ✅ Correct nonce
  const nonce = await accountContract.getNonce();

  const userOp = {
    sender: senderAddress,
    nonce: toHex(nonce),
    initCode: "0x",
    callData,
    callGasLimit: toHex(300000n),
    verificationGasLimit: toHex(200000n),
    preVerificationGas: toHex(50000n),
    maxFeePerGas: toHex(ethers.parseUnits("30", "gwei")),
    maxPriorityFeePerGas: toHex(ethers.parseUnits("5", "gwei")),
    paymasterAndData: "0x",
    signature: "0x",
  };

  const userOpHash = ethers.keccak256(ethers.toUtf8Bytes(safeStringify(userOp)));
  const signature = await signer.signMessage(ethers.getBytes(userOpHash));
  userOp.signature = signature;

  const res = await fetch(PIMLICO_BUNDLER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: safeStringify({
      jsonrpc: "2.0",
      id: 1,
      method: "eth_sendUserOperation",
      params: [userOp, ENTRY_POINT],
    }),
  });

  const data = await res.json();
  console.log("Bundler response:", data);
  return data;
}
