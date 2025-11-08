// import { ethers } from "ethers";
// import { MINIMAL_ACCOUNT_ADDRESS, ENTRY_POINT_ADDRESS, MINIMAL_ACCOUNT_ABI } from "../utils/constants";
// import { useEffect, useState } from "react";

// export default function WalletInfo() {
//     const [data,setData] = useState();

//     async function loadWalletInfo() {
//         try {
//             if(!window.ethereum){
//                 alert("Please Add Metamask");
//                 return;
//             }
//             const provider = new ethers.BrowserProvider(window.ethereum);
//             const contract = new ethers.Contract(MINIMAL_ACCOUNT_ADDRESS, MINIMAL_ACCOUNT_ABI, provider);
//             const balance = await provider.getBalance(MINIMAL_ACCOUNT_ADDRESS);
//             const nonce = await contract.getNonce();
//             const entryPoint = await contract.entryPoint();

//             setData({
//                 entryPoint,
//                 balance: ethers.formatEther(balance),
//                 nonce: nonce.toString()
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(() => {
//         loadWalletInfo();
//         const interval = setInterval(loadWalletInfo, 10000);
//         return () => clearInterval(interval);
//     },[]);
//      if(!data) return <p>loading wallet info!</p>

//     return(
//         <div>
//             <div className="bg-gray-100 p-4 m-4 rounded-xl shadow-md w-fit text-black">
//       <h2 className="text-xl font-semibold mb-2">🪪 Smart Wallet Info</h2>
//       <p className="text-black"><b>Address:</b> {MINIMAL_ACCOUNT_ADDRESS}</p>
//       <p className="text-black"><b>EntryPoint:</b> {data.entryPoint}</p>
//       <p className="text-black"><b>Nonce:</b> {data.nonce}</p>
//       <p className="text-black"><b>Balance:</b> {data.balance} ETH</p>
//     </div>
//         </div>
//     )
// }