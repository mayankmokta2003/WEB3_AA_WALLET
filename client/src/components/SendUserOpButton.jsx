import { ethers } from "ethers";
import { useState } from "react";
import { useWallet } from "../context/WalletContext";
import { buildUserOp } from "../utils/buildUserOp";
import { MINIMAL_ACCOUNT_ADDRESS } from "../utils/constants";
import ContractInfo from "./ContractInfo"

const SendUserOpButton = () => {

    const { address,signer,provider } = useWallet();
    const [loading, setLoading] = useState(false);
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [txHash, setTxHash] = useState("");

    const handleSend = async () => {
        try {
            if(!signer || !provider){
                alert("Please connect your wallet first");
                return;
            }
            setLoading(true);
            console.log("Building and sending UserOperation...");

            const value = ethers.parseEther(amount);
            const response = await buildUserOp(
                provider, signer, MINIMAL_ACCOUNT_ADDRESS, recipient, value
            );
            console.log("Bundler response:", response);
            
            if(response.result){
                setTxHash(response.result);
            }else {
                console.error("Bundler error:", response.error);
                alert("Error from bundler: " + response.error?.message);
              }

            
        } catch (err) {
            console.error("Error sending UserOperation:", err);
            alert("Transaction failed! Check console for details.");
          } finally {
            setLoading(false);
          }
            
        }

        return(
 
    <div className="flex flex-col gap-6 bg-gray-900 text-white p-6 rounded-2xl shadow-lg w-[600px] mx-auto mt-8 space-y-3">
    {/* <div className="flex flex-col gap-6 bg-gradient-to-r from-purple-950 to-pink-950  text-white p-6 rounded-2xl shadow-lg w-[600px] mx-auto mt-8 space-y-3 border"> */}
      <h2 className="text-xl font-semibold text-center ">
          Send from Contract Account
      </h2>

      <input 
      placeholder="Recipient address"
      type="text"
      value={recipient}
      onChange={(e) => setRecipient(e.target.value)}
      className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
      />

      <input 
      placeholder="Amount in ETH"
      type="text"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
      />

      <button onClick={handleSend} disabled={loading} className="bg-red-900 hover:bg-red-950 p-2 rounded-xl text-white font-semibold cursor-pointer">
      {/* <button onClick={handleSend} disabled={loading} className="bg-gradient-to-r from-red-700 to-gray-500 hover:bg-blue-700 p-2 rounded-xl text-white font-semibold cursor-pointer"> */}
      
      {loading ? "Sending..." : "Send"}
      </button>

         {txHash && (
        <p className="mt-4 text-sm">
          ✅ Transaction sent! <br />
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            View on Etherscan
          </a>
        </p>
      )}
      <ContractInfo />
    </div>

        )
    }

    export default SendUserOpButton;
