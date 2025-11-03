import { ethers } from "ethers";
import { useState } from "react";

export default function WalletConnectButton () {
    const [account,setAccount] = useState();

    async function connectWallet () {
        if(window.ethereum){
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts"
                });
                setAccount(accounts[0]);
                console.log(accounts)
            } catch (error) {
                console.log(error);
            }
        }else{
            alert("No Metamask found, Please install Metamask!!");
        }
    }



    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">AA Wallet</h1>
      {account ? (
        <p className="text-green-400">Connected: {account}</p>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      )}
    </div>


    




    )
}