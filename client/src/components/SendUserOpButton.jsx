import { ethers } from "ethers";
import { useState } from "react";
import { useWallet } from "../context/WalletContext";
import { buildUserOp } from "../utils/buildUserOp";
import { MINIMAL_ACCOUNT_ADDRESS } from "../utils/constants";

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
            


            <div className="p-4 border rounded-lg bg-gray-900 text-white w-[400px] mx-auto mt-6">
      <h2 className="text-lg font-bold mb-4">Send UserOperation</h2>

      <input
        type="text"
        placeholder="Recipient address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="w-full p-2 mb-2 rounded text-white"
      />
      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 mb-4 rounded text-white"
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white w-full"
      >
        {loading ? "Sending..." : "Send UserOp"}
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
    </div>

        )
    }

    export default SendUserOpButton;
