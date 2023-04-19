import { run } from 'hardhat';
import { mine } from '@nomicfoundation/hardhat-network-helpers';

export const verify = async (contractAddress: string, args: any[]) => {
  console.log('Verifying contract...');
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    console.log(`Error while verifying: ${e}`);
  }
};

export const moveBlocks = async (blocksToMove: number) => {
  await mine(blocksToMove);
};
