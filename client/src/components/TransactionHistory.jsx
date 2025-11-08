import { useState, useEffect } from "react";
import { useWallet } from "../context/WalletContext";
import { MINIMAL_ACCOUNT_ADDRESS } from "../utils/constants"

export default function TransactionHistory() {
  const [txs, setTxs] = useState([]);
  const { address } = useWallet();

  useEffect(() => {
    async function fetchTxs() {
      if (!address) return;

      try {
        const res = await fetch(
          `https://api.etherscan.io/v2/api?chainid=11155111&module=account&action=txlistinternal&address=${MINIMAL_ACCOUNT_ADDRESS}&page=1&offset=10&sort=desc&apikey=ZQK119TER4MZ7CJEH9EJFSKF636P5MMJ89`
        );

        const data = await res.json();
        console.log("Etherscan data:", data);

        if (data.status === "1" && Array.isArray(data.result)) {
          setTxs(data.result.slice(0, 5));
        } else {
          console.log("No txs found or invalid response:", data);
          setTxs([]);
        }
      } catch (err) {
        console.error("Error fetching txs:", err);
      }
    }

    fetchTxs();
  }, [address]);

  return (
    <div className="bg-gray-900 p-4 m-4 rounded-xl shadow-md w-100">
      <h2 className="text-xl font-semibold mb-2 ">
        📜 Internal Contract Transactions
      </h2>
      {txs.length === 0 ? (
        <p className="text-white">No internal transactions found yet.</p>
      ) : (
        <ul className="text-sm text-black">
          {txs.map((tx) => (
            <li key={tx.hash} className="mb-1">
              <a
                href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                target="_blank"
                rel="noreferrer"
                className="text-green-400 underline"
              >
                {tx.hash.slice(0, 10)}... → {(tx.value / 1e18).toFixed(4)} ETH
              </a>
            </li>
          ))}
        </ul>

      )}
    </div>
  );
}
