import "@/styles/globals.css";

import { publicProvider } from "wagmi/providers/public";
import {
  WagmiConfig,
  configureChains,
  createClient,
  goerli,
  mainnet,
} from "wagmi";

export default function App({ Component, pageProps }) {
  const { provider, webSocketProvider } = configureChains(
    [goerli],
    [publicProvider()]
  );

  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  });

  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
