import { ethers } from "ethers";
import { MINIMAL_ACCOUNT_ADDRESS, ENTRY_POINT_ADDRESS, MINIMAL_ACCOUNT_ABI } from "../utils/constants";
import { useEffect, useState } from "react";
import { useWallet } from "../context/WalletContext";

export default function ContractInfo() {

    const [contractBal, setContractBal] = useState();
    const { address } = useWallet();
    

    async function loadWalletInfo() {
        try {
            if(!window.ethereum){
                alert("Please Add Metamask");
                return;
            }
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(MINIMAL_ACCOUNT_ADDRESS, MINIMAL_ACCOUNT_ABI, provider);
            const balance = await provider.getBalance(MINIMAL_ACCOUNT_ADDRESS);
            const nonce = await contract.getNonce();
            const entryPoint = await contract.entryPoint();
            console.log(ethers.formatEther(balance));
            setContractBal(ethers.formatEther(balance));

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadWalletInfo();
        const interval = setInterval(loadWalletInfo, 10000);
        return () => clearInterval(interval);
    },[]);

    return(
        <div className="text-center bg-gray-800 p-4 rounded-lg shadow mt-4">
        {/* <h3 className="text-lg font-semibold">Contract Balance</h3> */}
        {address ? (
          <p className="text-xl font-bold text-gray-400">Contract Balance: {contractBal} ETH</p>        
        ) : (
          <p>Connect your Metamask first!!</p>
        )}
      </div>
    )
}