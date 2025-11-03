import { useState } from 'react';
import WalletConnectButton from "./components/WalletConnectButton";
import CreateSmartAccount from "./components/CreateSmartAccount";
// import { ethers } from "ethers";

import './App.css'

function App() {






  return (

  
  <div className="min-h-screen bg-amber-300 flex flex-col items-center justify-center gap-10">
    <WalletConnectButton />
    <CreateSmartAccount />
  </div>

    
    
  )
}




export default App;
