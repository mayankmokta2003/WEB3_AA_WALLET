import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useWallet } from "../context/WalletContext";

export default function TransactionHistory () {

    const [txs, setTxs] = useState([]);

    const { address } = useWallet();
    useEffect(() => {

        async function fetchTxs() {
            try {
                const res = await fetch(
                    `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc`
                  );
                  const data = await res.json();
                  if (data.status === "1") {
                    setTxs(data.result.slice(0, 5)); // latest 5 txs
                  }
                  console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchTxs();
    },[address]);


    return(

        <div className="bg-white p-4 m-4 rounded-xl shadow-md w-fit">
      <h2 className="text-xl font-semibold mb-2 text-black">📜 Recent Transactions</h2>
      {txs.length === 0 ? (
        <p className="text-black">No transactions found yet.</p>
      ) : (
        <ul className="text-sm ">
          {txs.map((tx) => (
            <li key={tx.hash} className="mb-1">
              <a
              
                href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline text-black"
              >
                {tx.hash.slice(0, 10)}... → {(tx.value / 1e18).toFixed(4)} ETH
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
    )

}