import { useWallet } from "../context/WalletContext";
import SendTransaction from "./SendTransaction";
import SendUserOpButton from "./SendUserOpButton";
import WalletInfo from "./WalletInfo";

export default function SendingEth() {
  const { address } = useWallet();

  return (
    <div className="mb-110 flex flex-col mt-15 justify-center items-center">
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
        </div>

        {/* <br className="h-2 bg-amber-950"/> */}

        <div className="flex flex-col justify-center items-center">
          <div>
            <h1 className="text-2xl">Send ETH from your Contract Account</h1>
          </div>

          <div>
            <p>connected</p>
          </div>


          <div>
                <SendUserOpButton />
                
          </div>
          {/* <div>
            <WalletInfo />
          </div> */}



        </div>
      </div>
    </div>
  );
}
