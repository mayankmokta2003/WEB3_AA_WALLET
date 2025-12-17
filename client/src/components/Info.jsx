import logo4 from "../../images/logo4.png";


export default function Info() {


    return(

        <div className="bg-gradient-to-r from-red-900 to-gray-900 m-20 rounded-4xl">
            <div className="flex flex-row justify-center items-center gap-40 pl-30 ">



                <div className="mt-4 space-y-14">
                    <img src={logo4} className="w-100 rounded-full" />

                <h1 className="text-amber-200">“Future of Web3 Wallets — Gasless, Secure, and Smart.”</h1>
                </div>

                




                <div className="space-y-14 mt-10 mb-10 p-10">

                    <div className="w-120 flex flex-col justify-center items-center">
                    <h4>⚡ Gasless Transactions</h4>
                    <p className="text-gray-400">Bundlers handle your gas — pay once or let a paymaster sponsor
              your fees.</p>
                    </div>

                    <div className="w-120 flex flex-col justify-center items-center">
                    <h4>🧩 Smart Wallets</h4>
                    <p className="text-gray-400">Each user gets a custom contract wallet with programmable control
              and unique rules.</p>
                    </div>


                    <div className="w-120 flex flex-col justify-center items-center">
                    <h4>🔐 Secure & Decentralized</h4>
                    <p className="text-gray-400">Your funds stay in your contract wallet — no central authority,
              just code and signatures.</p>
                    </div>


                    <div className="w-120 flex flex-col justify-center items-center">
                    <h4>🌍 Universal Access</h4>
                    <p className="text-gray-400">Use your wallet seamlessly across dApps — powered by ERC-4337, it
              works everywhere you go.</p>
                    </div>
                
                </div>





            </div>
        </div>

    )
}