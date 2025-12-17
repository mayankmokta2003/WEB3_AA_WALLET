import { useState, useEffect } from "react";
import logo4 from "../../images/logo4.png";
import logo1 from "../../images/logo1.png";
import logo2 from "../../images/logo2.png";
import logo3 from "../../images/logo3.png";
import { useWallet } from "../context/WalletContext";
import { LeftTransactions } from "../utils/LeftTX";
import { getPaymasterbalance } from "../utils/getPaymasterBalance";

export default function Navbar() {
  const { address, connectWallet } = useWallet();
  const [freeTx, setFreeTx] = useState();
  const [pmBalance, setPmBalance] = useState();

  const fetchInfo = async () => {
    const txleft = await LeftTransactions();
    const paymasterBalance = await getPaymasterbalance();
    setFreeTx(txleft);
    setPmBalance(paymasterBalance);
  };
  useEffect(() => {
    fetchInfo();
    const interval = setInterval(fetchInfo, 20000); // refresh every 20s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-20 mt-14">
      <div className="">
        <div className="mt-5 flex flex-row justify-evenly items-center gap-50">
          <div className="w-29 ">
            <img src={logo1} className="cursor-pointer rounded-full" />
          </div>
          <div className="flex flex-row gap-20">
            <h3 className="cursor-pointer text-gray-400">Home</h3>
            <h3 className="cursor-pointer text-gray-400">Build</h3>
            <h3 className="cursor-pointer text-gray-400">Features</h3>
            <h3 className="cursor-pointer text-gray-400">Wallet</h3>
          </div>

          
            {/* <h3>Contact Us</h3> */}
            <div>
              {address ? (
                <div className="bg-gradient-to-r from-red-700 to-gray-700 rounded-4xl h-14 w-40 flex justify-center items-center cursor-pointer">
                  <button className="cursor-pointer ">
                    <h4 className="text-xl">Connected</h4>
                  </button>
                </div>
              ) : (
                <button
                  className="bg-gradient-to-r from-gray-700 to-red-700 rounded-4xl h-14 w-40 flex justify-center items-center cursor-pointer "
                  onClick={connectWallet}
                >
                  <h4 className="text-xl">Connect Wallet</h4>
                </button>
              )}
            </div>
          
        </div>

        <div className="mt-15 flex justify-evenly items-center flex-row gap-40">
          <div>
            <div className="space-y-3 relative top-1">


              <h1 className="text-6xl pl-14">Your personal decentralized smart wallet powered by Account
                Abstraction.</h1>



            </div>
            <div className="relative top-19 space-y-2">
              <h3 className="pl-14 text-2xl pr-20 text-gray-400">
                "Built on Account Abstraction (ERC-4337) — Powered by Smart
                Paymaster."
              </h3>
              {/* 
              <h3>
                "Manage assets, send transactions, and own your rules — no
                private keys needed."
              </h3> */}
            </div>
          </div>

          <div className="relative top-">


            <div>
                {/* {address ? (
                    <div className="bg-gradient-to-r from-red-500 to-purple-500 h-30 w-50 rounded-xl flex justify-center items-center">
                        <div className="ml-4">
                  <h4>Paymaster Balance: {pmBalance}</h4>
                  <br></br>
                  <h4>Free Paymaster Tx left: {freeTx}</h4>
                </div>
                    </div>
                ) : (
                    <div className="bg-gradient-to-r from-blue-500 to-green-500 h-30 w-50 rounded-xl flex justify-center items-center">
                        <h4>Connect your Metamask</h4>
                    </div>
                )} */}
            </div>

            <img src={logo2} className="pr-14 w-322 rounded-4xl"/>



          </div>
        </div>

      </div>
    </div>
  );
}
