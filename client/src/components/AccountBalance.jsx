import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useWallet } from "../context/WalletContext";
import { MINIMAL_ACCOUNT_ADDRESS } from "../utils/constants";

const AccountBalance = () => {

    const { address } = useWallet();
    const[balance,setBalance] = useState();
    const[smartContractBalance, setSmartContractBalance] = useState();

    useEffect(() => {
        const fetchBalance = async () => {
            if(!address) return;
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const bal = await provider.getBalance(address);
                const SMBalance = await provider.getBalance(MINIMAL_ACCOUNT_ADDRESS);
                setBalance(ethers.formatEther(bal));
                setSmartContractBalance(ethers.formatEther(SMBalance));
            } catch (error) {
                console.log(error);
            }
        }
            fetchBalance();
            const interval = setInterval(fetchBalance, 10000); // auto refresh
            return () => clearInterval(interval);
    },[address]);


    return (
        <div className="text-center bg-gray-800 p-4 rounded-lg shadow mt-4">
      <h3 className="text-lg font-semibold">Metamask Account Balance</h3>
      {balance ? (
        <p className="text-xl font-bold text-green-400">Metamask Balance: {balance} ETH</p>        
      ) : (
        <p>Connect your Metamask first!!</p>
      )}

    </div>
    )
}

export default AccountBalance;