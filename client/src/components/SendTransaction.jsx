import { useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "../context/WalletContext";
import {
  MINIMAL_ACCOUNT_ADDRESS,
  MINIMAL_ACCOUNT_ABI,
} from "../utils/constants";

const SendTransaction = () => {
  const { signer } = useWallet();

  const [status, setStatus] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const handleSend = async () => {
    try {
      if (!signer) {
        alert("Please connect Metamask account first!!");
        return;
      }
      // const accountAddress = prompt("Enter your deployed MinimalAccount address:");
      // const accountContract = new ethers.Contract(
      //     MINIMAL_ACCOUNT_ADDRESS, MINIMAL_ACCOUNT_ABI, signer,
      // )

      const accountAddress = prompt(
        "Enter your deployed MinimalAccount address:"
      );
      if (!accountAddress) {
        alert("Please enter your deployed MinimalAccount address!");
        return;
      }

      const accountContract = new ethers.Contract(
        accountAddress, // ✅ use user-provided clone address here
        MINIMAL_ACCOUNT_ABI,
        signer
      );

      setStatus("Sending transaction...");

      const value = ethers.parseEther(amount);

      const tx = await accountContract.execute(to, value, "0x");
      await tx.wait();

      setStatus("✅ Transaction sent successfully!");
    } catch (error) {
      console.log(error);
      // alert("Transaction Failed");
    }
  };

  return (
    <div className="flex flex-col gap-3 bg-gray-900 text-white p-6 rounded-2xl shadow-lg w-[400px] mx-auto mt-8">
      <h2 className="text-xl font-semibold text-center mb-2">
        Send ETH from Smart Account
      </h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
      />

      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
      />

      <button
        onClick={handleSend}
        className="bg-blue-600 hover:bg-blue-700 p-2 rounded-xl text-white font-semibold"
      >
        Send
      </button>
      {status && <p className="text-center mt-2">{status}</p>}
    </div>
  );
};

export default SendTransaction;
