import verify from '../utils/helper-functions';
import {
  QUORUM_PERCENTAGE,
  VOTING_DELAY,
  VOTING_PERIOD,
} from '../config/general';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { ethers } from 'hardhat';

const deployGovernorContract: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, network, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const signer = ethers.provider.getSigner(deployer);
  const deployerBalance = await signer.getBalance();

  console.log('Deploying from address: ', deployer);
  console.log('Account Balance:', ethers.utils.formatEther(deployerBalance));

  const governanceToken = await deployments.get('GovernanceToken');
  const timeLock = await deployments.get('TimeLock');
  const governorContract = await deploy('GovernorContract', {
    from: deployer,
    args: [
      governanceToken.address,
      timeLock.address,
      VOTING_DELAY,
      VOTING_PERIOD,
      QUORUM_PERCENTAGE,
    ],
    log: true,
  });

  console.log(`GovernorContract deployed at ${governorContract.address}`);

  if (network.live) {
    console.log(`Sent for verification...`);
    await verify(governorContract.address, []);
    console.log(`Successfully verified!`);
  }
};

export default deployGovernorContract;
