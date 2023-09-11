import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  ThirdwebProvider,
  metamaskWallet,
   coinbaseWallet,
 
} from "@thirdweb-dev/react";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   <ThirdwebProvider
      activeChain="mumbai"
      clientId="d974fd84e15a8fb6456c8c94112b56da"
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
       
      ]}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThirdwebProvider>
  </React.StrictMode>
);
