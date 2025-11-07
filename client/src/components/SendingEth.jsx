import { useWallet } from "../context/WalletContext";
import SendTransaction from "./SendTransaction";
import SendUserOpButton from "./SendUserOpButton";
import { MINIMAL_ACCOUNT_ADDRESS } from "../utils/constants";
import TransactionHistoryMetaMask from "./MetaTransactionHistory";
import TransactionHistory from "./TransactionHistory";

export default function SendingEth() {
  const { address } = useWallet();

  return (
    <div className=" flex flex-col justify-center items-center">
      <div>
        <h1 className="text-5xl">Send Transactions</h1>
      </div>

      <div className="flex mt-12 justify-between items-center gap-40">
        <div className="flex flex-col justify-center items-center">
          <div>
            <h1 className="text-2xl">Send ETH from Metamask Account</h1>
          </div>

          <div>
            {address ? (
              <p className="text-green-400 mt-2">Connected: {address}</p>
            ) : (
              <p>Please connect your metamask</p>
            )}
          </div>

          <div>
            <SendTransaction />
          </div>
          <div>
          <TransactionHistoryMetaMask />
          </div>
        </div>

        {/* <br className="h-2 bg-amber-950"/> */}

        <div className="flex flex-col justify-center items-center">
          <div>
            <h1 className="text-2xl">Send ETH from your Contract Account</h1>
          </div>

          <div>
          {address ? (
              <p className="text-green-400 mt-2">Connected: {MINIMAL_ACCOUNT_ADDRESS}</p>
            ) : (
              <p>Please connect your metamask</p>
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
