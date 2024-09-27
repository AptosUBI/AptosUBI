declare global {
  interface Window {
    aptos: any;
  }
}

import { useState, useEffect } from "react";
import { Aptos, AptosConfig, Network, Account } from "@aptos-labs/ts-sdk";

import logo from "./assets/aptos_ubi.png";
import aptos_logo from "./assets/aptos_logo.png";

function App() {
  const [aptos, setAptos] = useState<Aptos | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const initializeAptos = () => {
      const aptosConfig = new AptosConfig({ network: Network.TESTNET });
      const aptosClient = new Aptos(aptosConfig);
      setAptos(aptosClient);
    };
    initializeAptos();
  }, []);

  const connectWallet = async () => {
    if (typeof window.aptos !== "undefined") {
      try {
        await window.aptos.connect();
        const accountAddress = await window.aptos.account();
        setAccount(accountAddress);
        setIsConnected(true);
        await updateBalance(accountAddress.address);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      console.error("Aptos wallet not found");
    }
  };

  const updateBalance = async (address: string) => {
    if (aptos) {
      try {
        const resources = await aptos.getAccountResources({
          accountAddress: address,
        });
        const accountResource = resources.find(
          (r) => r.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
        );
        if (accountResource && "data" in accountResource) {
          setBalance((accountResource.data as any).coin.value);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  };

  return (
    <div className="App">
      <header>
        <a className="text-apt" href="#">
          <h2 className="text-apt">APTOS UBI</h2>
        </a>
        <a
          href="https://aptosfoundation.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={aptos_logo} alt="Aptos Logo" className="logo-apt" />
        </a>
      </header>
      <section className="center-section">
        <img src={logo} alt="Aptos UBI Logo" />
        {!isConnected ? (
          <section className="wallet-section">
            <button onClick={connectWallet}>Connect Wallet</button>
            <a
              href="https://petra.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Aptos Wallet
            </a>
          </section>
        ) : (
          <div>
            <p>Connected Address: {(account as any)?.address}</p>
            <p>Balance: {balance} octas</p>
          </div>
        )}
        <footer>
          <p>&copy; Aptos UBI. All Rights Reserved.</p>
        </footer>
      </section>
    </div>
  );
}

export default App;
