import { ZERO_ADDRESS } from '../config/general';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { ethers } from 'hardhat';

const setupGovernance: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, network, deployments } = hre;
  const { deployer } = await getNamedAccounts();

  const timeLock = await ethers.getContract('TimeLock', deployer);
  const governorContract = await ethers.getContract(
    'GovernorContract',
    deployer
  );

  console.log('Setting up roles...');
  // TODO: optimize using Multicall
  const proposerRole = await timeLock.PROPOSER_ROLE();
  const executorRole = await timeLock.EXECUTOR_ROLE();
  const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE();

  const proposerTX = await timeLock.grantRole(
    proposerRole,
    governorContract.address
  );
  await proposerTX.wait();
  const executorTx = await timeLock.grantRole(executorRole, ZERO_ADDRESS);
  await executorTx.wait();
  const revokeTx = await timeLock.revokeRole(adminRole, deployer);
  await revokeTx.wait();

  console.log('Roles set successfully!');
};

export default setupGovernance;
