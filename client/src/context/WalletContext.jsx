import { useState, useContext, createContext } from "react";
import { ethers } from "ethers";

const WalletContext = createContext();

export const WalletProvider = ({children}) => {

  const [address, setAddress] = useState();
  const [signer, setSigner] = useState();
  const [provider, setProvider] = useState();


    const connectWallet = async () => {
        try {
            if(!window.ethereum){
                alert ("No Metamask account found, Please install Metamask");
                return;
            }
            const ethProvider = new ethers.BrowserProvider(window.ethereum);
            // const accounts = await ethProvider.send("eth_requestAccounts",[]);
            const accounts = await ethereum.request({method: "eth_requestAccounts"});
            const signer = await ethProvider.getSigner();

            setProvider(ethProvider);
            setSigner(signer);
            setAddress(accounts[0]);
            console.log(accounts);
            

        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    }


    return (
        <WalletContext.Provider value={{
            address,signer,provider,connectWallet,
        }}>
            {children}
        </WalletContext.Provider>
    )
}

export const useWallet = () => useContext(WalletContext);


