import { useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "../context/WalletContext";
import { ACCOUNT_FACTORY_ABI, ACCOUNT_FACTORY_ADDRESS, ENTRY_POINT_ADDRESS } from "../utils/constants";




export default function CreateSmartAccount() {

    const {accounts,signer} = useWallet();
    const[loading,setLoading] = useState(false);


    const createAccount = async () => {
        try {
            if(!signer){
                alert("Please connect Metamask first!!");
                return;
            }
            

            const factory = new ethers.Contract(
                ACCOUNT_FACTORY_ADDRESS,
                ACCOUNT_FACTORY_ABI,
                signer,
            );
            setLoading(true);
            const tx = await factory.createAccount(ENTRY_POINT_ADDRESS);
            await tx.wait();

            alert("✅ Smart account successfully created!");
            setLoading(false);
            
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    return (
        <div className="p-6 bg-gray-900 text-white rounded-2xl flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-3">Create Your Smart Account</h2>

      <button
        onClick={createAccount}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
      >
        {loading ? "Creating..." : "Create Smart Account"}
      </button>
    </div>

    )
}