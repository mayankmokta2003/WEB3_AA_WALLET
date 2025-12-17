import { useWallet } from "../context/WalletContext";
import SendTransaction from "./SendTransaction";
import SendUserOpButton from "./SendUserOpButton";
import { MINIMAL_ACCOUNT_ADDRESS } from "../utils/constants";
import TransactionHistoryMetaMask from "./MetaTransactionHistory";
import TransactionHistory from "./TransactionHistory";

export default function SendingEth() {
  const { address } = useWallet();

  return (
    <div className=" flex flex-col justify-center items-center bg-gradient-to-r from-red-900 to-gray-900 m-20 rounded-4xl pt-10">
      <div>
        <h1 className="text-5xl">Send Transactions</h1>
      </div>

      <div className="flex mt-8 justify-between items-center gap-40">
        {/* <div className="flex flex-col justify-center items-center">
          <div>
            <h1 className="text-2xl mb-5">Send ETH using your MetaMask Wallet</h1>
            <div className="space-y-1">
            <p>This section lets you send normal Ethereum transactions</p>
              <p>directly from your MetaMask wallet. Perfect for comparing</p>
              <p>traditional vs. smart wallet transfers.</p>
              </div>
          </div>

          <div className="mt-5">
            {address ? (
              <p className="text-gray-400 mt-2">Connected: {address}</p>
            ) : (
              <p className="text-xl">Please connect your metamask</p>
            )}
          </div>

          <div>
            <SendTransaction />
          </div>
          <div>
          <TransactionHistoryMetaMask />
          </div>
        </div> */}

        {/* <br className="h-2 bg-amber-950"/> */}

        <div className="flex flex-col justify-center items-center">
          <div >
            
          </div>

          <div className="">
          {address ? (
              <p className="text-gray-400 ">Connected: {MINIMAL_ACCOUNT_ADDRESS}</p>
            ) : (
              <p className="text-xl text-gray-400">Please connect your metamask</p>
            )}
          </div>

          <div>
                <SendUserOpButton />
          </div>
          <div>
         <TransactionHistory />
          </div>

        </div>
      </div>
    </div>
  );
}
