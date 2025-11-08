import logo from "../../images/logo.png";
import { useWallet } from "../context/WalletContext";


export default function Navbar() {
    
    const{ address, connectWallet } = useWallet();

    return(

        <div className="mb-20 ">
            <div className="">

                <div className="mt-5 flex flex-row justify-evenly items-center gap-50">
                    <div className="w-29 ">
                        <img src={logo} className="cursor-pointer rounded-full"/>
                    </div>
                    <div className="flex flex-row gap-20">
                        <h3 className="cursor-pointer">Home</h3>
                        <h3 className="cursor-pointer">Build</h3>
                        <h3 className="cursor-pointer">Features</h3>
                        <h3 className="cursor-pointer">Wallet</h3>
                    </div>

                    <div>
                        <h3>Contact Us</h3>
                    </div>
                </div>




                <div className="mt-15 flex justify-evenly items-center flex-row gap-100">

                    <div >
                        <div className="space-y-3 relative top-10">
                            <h1 className="font-mono text-4xl">
                            Welcome to Krypton Wallet </h1>
                            <h1 className="font-mono text-4xl">Contract Wallet</h1>
                            </div>
                            <div className="relative top-17 space-y-2">
                            <h3 className="">
                            Your personal decentralized smart wallet powered by Account Abstraction. 
                            </h3>
                            <h3>Manage assets, send transactions, and own your rules — no private keys needed.</h3>
                            </div>
                    </div>


                    <div className="relative top-12">

                        <div className="bg-gradient-to-r from-red-500 to-purple-500 h-24 w-50 rounded-xl flex justify-center items-center">
                            {address ? (
                                <h4>Metamask connected</h4>
                            ): (
                                <h4>Connect your Metamask</h4>
                            )}
                            </div>

                            <div>
                                {address ? (
                                    <div className="bg-gradient-to-r from-red-500 to-purple-500 rounded-4xl h-15 w-50 mt-10 flex justify-center items-center cursor-pointer">
                                        <button className="cursor-pointer ">
                                            <h4 className="text-xl">Connected</h4>
                                        </button>
                                    </div>
                                ) : (
                                    <button className="bg-gradient-to-r from-blue-500 to-green-500 rounded-4xl h-15 w-50 mt-10 flex justify-center items-center cursor-pointer " onClick={connectWallet}>
                                <h4 className="text-xl">Connect Wallet</h4>
                            </button>
                                )}

                            </div>


                    </div>



                </div>


                <div className="flex flex-row items-center justify-center gap-20 mt-40">

                    <div className="h-28 w-50 bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col justify-center items-center rounded-2xl">
                        <h2>🧩 Smart Wallets</h2>
                        <p className="text-sm ml-1">Each user gets a custom contract wallet with programmable control and unique rules.</p>
                    </div>
                    <div className="h-28 w-50 bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col justify-center items-center rounded-2xl">
                        <h1>⚡ Gasless Transactions</h1>
                        <p className="text-sm ml-1">Bundlers handle your gas — pay once or let a paymaster sponsor your fees.</p>
                    </div>
                    <div className="h-28 w-50 bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col justify-center items-center rounded-2xl">
                        <h1>🔐 Secure & Decentralized</h1>
                        <p className="text-sm ml-1">Your funds stay in your contract wallet — no central authority, just code and signatures.</p>
                    </div>
                    <div className="h-28 w-50 bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col justify-center items-center rounded-2xl">
                    <h1>🌍 Universal Access</h1>
                        <p className="text-sm ml-1">Use your wallet seamlessly across dApps — powered by ERC-4337, it works everywhere you go.</p>
                    </div>

                </div>

                

            </div>
        </div>


    )
}