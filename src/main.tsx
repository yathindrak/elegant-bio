import React from "react";
import ReactDOM from "react-dom/client";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { infuraProvider } from "wagmi/providers/infura";
import { ConnectKitProvider } from "connectkit";
import App from "./App";
import "./index.css";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli],
  [infuraProvider({ apiKey: import.meta.env.VITE_USER_INFURA_API_KEY })]
);

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "ElegantBio",
      },
    }),
    new WalletConnectConnector({ chains, options: { qrcode: true } }),
    new InjectedConnector({
      chains,
      options: {
        name: "Browser Wallet",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <App />
      </ConnectKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
