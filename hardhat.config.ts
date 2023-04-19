import { HardhatUserConfig } from 'hardhat/config';
//utils
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy';
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';
//config
import { getChainConfig } from './config/chains';

const dotenvConfigPath: string = process.env.DOTENV_CONFIG_PATH || './.env';
dotenvConfig({ path: resolve(__dirname, dotenvConfigPath) });

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      live: false,
      chainId: 31337,
    },
    localhost: {
      live: false,
      chainId: 31337,
    },
    polygon_mumbai: getChainConfig('polygon_mumbai'),
    polygon: getChainConfig('polygon'),
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  etherscan: {
    apiKey: {
      polygon: process.env.POLYGONSCAN_API_KEY || '',
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || '',
    },
  },
  solidity: {
    version: '0.8.18',
    settings: {
      optimizer: {
        enabled: true,
        // lower run to reduce GovernorContract size
        runs: 200,
      },
    },
  },
};

export default config;
