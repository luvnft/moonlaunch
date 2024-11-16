import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    neondevnet: {
      url: "https://devnet.neonevm.org",
      accounts: [
        "95c5da91a9fc55627b73bd8720d09a05249643446d3ad97ecbac7328f141e777",
      ],
      chainId: 245022926,
    },
  },
};

export default config;
