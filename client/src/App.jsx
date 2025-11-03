import { useState } from 'react';
import WalletConnectButton from "./components/WalletConnectButton";
import CreateSmartAccount from "./components/CreateSmartAccount";
import SendTransaction from "./components/SendTransaction";
import { useWallet } from './context/WalletContext';

import './App.css'

function App() {

const { connectWallet, address } = useWallet();




  return (

  
  // <div className="min-h-screen bg-amber-300 flex flex-col items-center justify-center gap-10">
  //   <WalletConnectButton />
  //   <CreateSmartAccount />
  //   <SendTransaction />
  // </div>




  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
      {!address ? (
        <button
          onClick={connectWallet}
          className="bg-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-700"
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <p className="text-green-400 mt-2">Connected: {address}</p>
          <SendTransaction />
        </>
      )}
    </div>

    
    
  )
}




export default App;
