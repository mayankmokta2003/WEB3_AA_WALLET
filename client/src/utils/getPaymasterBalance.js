
import { ethers } from "ethers";
import { SEPOLIA_RPC_URL,ENTRY_POINT_ADDRESS,V2SMART_PAYMASTER } from "./constants"

export async function getPaymasterbalance() {
    try {
        const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
        const entryPoint = new ethers.Contract(ENTRY_POINT_ADDRESS, [
            "function balanceOf(address) view returns (uint256)"
        ],provider);

        const balance = await entryPoint.balanceOf(V2SMART_PAYMASTER);
        
        console.log("Paymaster balance:", Number(ethers.formatEther(balance)), "ETH");
        return Number(ethers.formatEther(balance));
        
    } catch (error) {
        console.log(error);
    }
}