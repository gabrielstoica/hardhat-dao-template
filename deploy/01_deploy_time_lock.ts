import verify from '../utils/helper-functions';
import { MIN_DELAY } from '../config/general';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { ethers } from 'hardhat';

const deployTimeLock: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, network, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const signer = ethers.provider.getSigner(deployer);
  const deployerBalance = await signer.getBalance();

  console.log('Deploying from address: ', deployer);
  console.log('Account Balance:', ethers.utils.formatEther(deployerBalance));

  const timeLock = await deploy('TimeLock', {
    from: deployer,
    args: [MIN_DELAY, [], []],
    log: true,
  });

  console.log(`TimeLock deployed at ${timeLock.address}`);

  if (network.live) {
    console.log(`Sent for verification...`);
    await verify(timeLock.address, []);
    console.log(`Successfully verified!`);
  }
};

export default deployTimeLock;
