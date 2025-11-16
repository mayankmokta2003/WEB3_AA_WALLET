import { ethers } from "ethers"
import { SEPOLIA_RPC_URL,V2SMART_PAYMASTER,SMART_PAYMASTER_V2_ABI,MINIMAL_ACCOUNT_ADDRESS } from "./constants"

export async function LeftTransactions() {

    try{

        // const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const paymaster = new ethers.Contract(V2SMART_PAYMASTER,SMART_PAYMASTER_V2_ABI,provider);
        const freeTx = await paymaster.remainingFreeTx(MINIMAL_ACCOUNT_ADDRESS);
        // console.log(Number(freeTx));
        return Number(freeTx);
        
    }catch(e){
        console.log(e);
    }
    
}