import verify from '../utils/helper-functions';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { ethers } from 'hardhat';

const deployBox: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, network, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const signer = ethers.provider.getSigner(deployer);
  const deployerBalance = await signer.getBalance();

  console.log('Deploying from address: ', deployer);
  console.log('Account Balance:', ethers.utils.formatEther(deployerBalance));

  const box = await deploy('Box', {
    from: deployer,
    args: [],
    log: true,
  });

  console.log(`Box deployed at ${box.address}`);

  if (network.live) {
    console.log(`Sent for verification...`);
    await verify(box.address, []);
    console.log(`Successfully verified!`);
  }

  console.log('Transferring ownership to the TimeLock contract...');
  const timeLock = await ethers.getContract('TimeLock');
  const boxContract = await ethers.getContract('Box');
  const transferOwnershipTx = await boxContract.transferOwnership(
    timeLock.address
  );
  await transferOwnershipTx.wait();
  console.log('Ownership transferred successfully!');
};

export default deployBox;
