import { createConfig, http, injected } from "@wagmi/core";
import { sepolia } from "@wagmi/core/chains";

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}

export const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors: [injected()],
  transports: {
    // [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
export default wagmiConfig;
