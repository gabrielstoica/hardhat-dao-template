import { NetworkUserConfig } from 'hardhat/types';
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';

const dotenvConfigPath: string = process.env.DOTENV_CONFIG_PATH || '../.env';
dotenvConfig({ path: resolve(__dirname, dotenvConfigPath) });

const PRIVATE_KEY: string = process.env.PRIVATE_KEY || '';
if (!PRIVATE_KEY) {
  throw new Error('Private key is missing from the .env file. Aborting...');
}

const INFURA_API_KEY: string | undefined = process.env.INFURA_API_KEY;
if (!INFURA_API_KEY) {
  throw new Error('Infura API Key is missing from the .env file. Aborting...');
}

interface ChainConfig {
  live: boolean;
  chainId: number;
  rpcUrl: string;
  defenderId?: string;
}

const chainsConfig: Record<string, ChainConfig> = {
  polygon: {
    live: true,
    chainId: 137,
    rpcUrl: `https://polygon-mainnet.infura.io/v3/${INFURA_API_KEY}`,
    defenderId: 'matic',
  },
  polygon_mumbai: {
    live: true,
    chainId: 80001,
    rpcUrl: `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`,
    defenderId: 'mumbai',
  },
};

export const getChainConfig = (
  chainAbbreviation: keyof typeof chainsConfig
): NetworkUserConfig => {
  const chainConfig = chainsConfig[chainAbbreviation];
  return {
    accounts: [PRIVATE_KEY],
    chainId: chainConfig.chainId,
    url: chainConfig.rpcUrl,
  };
};
