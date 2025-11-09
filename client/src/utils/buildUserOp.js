// https://api.pimlico.io/v2/sepolia/rpc?apikey=pim_bHDSBUCDUVi6u2MStWMcZT

import { ethers } from "ethers";
import { MINIMAL_ACCOUNT_ABI,V2SMART_PAYMASTER,SMART_PAYMASTER } from "./constants";

const PIMLICO_BUNDLER =
  "https://api.pimlico.io/v2/sepolia/rpc?apikey=pim_bHDSBUCDUVi6u2MStWMcZT";
const ENTRY_POINT = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const ENTRY_POINT_ABI = [
  "function getNonce(address sender, uint192 key) view returns (uint256)",
];

function toHex(n) {
  return ethers.toBeHex(n);
}

export async function buildUserOp(
  provider,
  signer,
  senderAddress,
  target,
  value
) {
  const accountContract = new ethers.Contract(
    senderAddress,
    MINIMAL_ACCOUNT_ABI,
    signer
  );

  const ep = new ethers.Contract(ENTRY_POINT, ENTRY_POINT_ABI, provider);

  const callData = accountContract.interface.encodeFunctionData("execute", [
    target,
    value,
    "0x",
  ]);
  // const nonce = await provider.getTransactionCount(senderAddress);
  // const nonce = await accountContract.getNonce();
  const nonceBN = await ep.getNonce(senderAddress, 0n);

  const userOp = {
    sender: senderAddress,
    nonce: toHex(nonceBN),
    initCode: "0x",
    callData,
    callGasLimit: toHex(150000n),
    verificationGasLimit: toHex(150000n),
    preVerificationGas: toHex(60000n),
    maxFeePerGas: toHex(ethers.parseUnits("20", "gwei")),
    maxPriorityFeePerGas: toHex(ethers.parseUnits("2", "gwei")),
    // solidityPacked is sm like abi.encodePacked and it expects data in ABI-encoded bytes hex form and in 1st para we tell kis type ka data hai 
    // toHex only converts numbers not addresses thats why we used solidityPacked
    paymasterAndData: ethers.solidityPacked(["address"], [V2SMART_PAYMASTER]),
    signature: "0x",
  };

  // Use the actual EntryPoint contract to compute the userOpHash
  const entryPoint = new ethers.Contract(
    ENTRY_POINT,
    [
      "function getUserOpHash((address sender,uint256 nonce,bytes initCode,bytes callData,uint256 callGasLimit,uint256 verificationGasLimit,uint256 preVerificationGas,uint256 maxFeePerGas,uint256 maxPriorityFeePerGas,bytes paymasterAndData,bytes signature) userOp) view returns (bytes32)",
    ],
    provider
  );

  // Compute the real hash EntryPoint uses internally
  const userOpHash = await entryPoint.getUserOpHash(userOp);

  // Sign the correct hash using EIP-191 ("Ethereum Signed Message")
  const signature = await signer.signMessage(ethers.getBytes(userOpHash));

  userOp.signature = signature;

  // ✅ Send to bundler
  const res = await fetch(PIMLICO_BUNDLER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
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





