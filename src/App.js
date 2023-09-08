import "./App.css";
import { Header } from "./Components/Header";
// import { Footer } from "./Components/Footer";
import backgroundpic from "./assets/Luffy.jpg";
import { Allroutes } from "./Components/Allroutes";
import {  useConnectionStatus } from "@thirdweb-dev/react";
import { useEffect } from "react";
import { ethers } from "ethers";


function App() {

  const status = useConnectionStatus();

const [pageChainId, setPageChainId] = useState(0);

const changeChainID = async () => {
    if (status === "connected") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const chainId = await signer.getChainId();
      setPageChainId(chainId);
      if (chainId !== 0x13881) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: "0x13881",
            },
          ],
        });
      }
    }
  };

 useEffect(() => {
    changeChainID();
  }, [pageChainId]);
  return (
    <div className="min-h-screen relative">
      {/* Pseudo-element for the blurred background */}
      <div
        className="absolute inset-0 bg-center bg-cover filter blur-lg"
        style={{
          backgroundImage: `url(${backgroundpic})`,
        }}
      ></div>

      {/* Content on top of the blurred background */}
      <div className="relative z-10">
        <Header />
        <div>
          <Allroutes />
        </div>
      </div>
    </div>
  );
}

export default App;
