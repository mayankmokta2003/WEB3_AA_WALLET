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
                        <h3>Home</h3>
                        <h3>help</h3>
                        <h3>yesss</h3>
                        <h3>boooooooo</h3>
                    </div>

                    <div>
                        <h3>Contact Us</h3>
                    </div>
                </div>




                <div className="mt-15 flex justify-evenly items-center flex-row gap-100">

                    <div>
                        <div>
                            <p>150+</p>
                            <h1 className="font-mono text-4xl">
                                Create your own <br />
                                 Contract Wallet
                            </h1>
                            <h3>
                                Create your own decentralized wallet just like metamask 
                            </h3>
                            <h3>which will have its own balance and own rules</h3>
                        </div>
                    </div>


                    <div className="">

                        <div className="bg-amber-800 h-24 w-50 rounded-xl ">
                            x
                            </div>

                        <div className="bg-amber-950 rounded-4xl h-15 w-50 mt-10 flex justify-center items-center cursor-pointer">
                            {address ? (
                                <button className="cursor-pointer ">
                                <h4>Connected</h4>
                            </button>
                            ) : (
                                <button className="cursor-pointer " onClick={connectWallet}>
                                <h4>Connect Wallet</h4>
                            </button>
                            )}
                            
                        </div>

                    </div>



                </div>


                <div className="flex flex-row items-center justify-center gap-20 mt-40">

                    <div className="h-25 w-50 bg-amber-300 flex flex-col justify-center items-center rounded-2xl"></div>
                    <div className="h-25 w-50 bg-amber-300 flex flex-col justify-center items-center rounded-2xl">t</div>
                    <div className="h-25 w-50 bg-amber-300 flex flex-col justify-center items-center rounded-2xl">b</div>
                    <div className="h-25 w-50 bg-amber-300 flex flex-col justify-center items-center rounded-2xl">b</div>

                </div>

                

            </div>
        </div>


    )
}