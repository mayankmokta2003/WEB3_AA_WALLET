import { useWallet } from './context/WalletContext';
import Navbar from './components/Navbar';
import SendingEth from "./components/SendingEth";


// in alert MinimalAccount address: 0x0bD6dc99C7Aaf56cC5A648476700294ad141aa76
// my contract address to receive money: 0x0bD6dc99C7Aaf56cC5A648476700294ad141aa76

// MinimalAccount deployed at for UserOp: 0x535006AC5CEe48a2e94e3fDd23577D24ab80D1c0
import './App.css'

function App() {

const { connectWallet, address } = useWallet();




  return (

 
  <div className=" text-white">
    <Navbar />
      <SendingEth />
    </div>

  )
}




export default App;
