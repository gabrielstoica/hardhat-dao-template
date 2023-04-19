import { ethers } from 'hardhat';
import verify from '../utils/helper-functions';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deployGovernanceToken: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, network, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const signer = ethers.provider.getSigner(deployer);
  const deployerBalance = await signer.getBalance();

  console.log('Deploying from address: ', deployer);
  console.log('Account Balance:', ethers.utils.formatEther(deployerBalance));

  const governanceToken = await deploy('GovernanceToken', {
    from: deployer,
    args: [],
    log: true,
  });

  console.log(`GovernanceToken deployed at ${governanceToken.address}`);

  if (network.live) {
    console.log(`Sent for verification...`);
    await verify(governanceToken.address, []);
    console.log(`Successfully verified!`);
  }

  console.log(`Delegating votes to ${deployer}...`);
  // self-delegating voting power
  await delegate(governanceToken.address, deployer);
  console.log(`Votes successfully delegated!`);
};

export default deployGovernanceToken;

const delegate = async (governanceTokenAddress: string, delegatee: string) => {
  const governanceToken = await ethers.getContractAt(
    'GovernanceToken',
    governanceTokenAddress
  );

  const tx = await governanceToken.delegate(delegatee);
  await tx.wait();
  //console.log(`Checkpoints ${await governanceToken.numCheckpoints(delegatee)}`);
};
