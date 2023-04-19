import { ethers } from 'hardhat';
import { NEW_PROPOSAL } from '../../config/general';

export async function propose() {
  const boxContract = await ethers.getContract('Box');
  const governorContract = await ethers.getContract('GovernorContract');

  const encodedCalldata = boxContract.interface.encodeFunctionData(
    NEW_PROPOSAL.targetFunction,
    [NEW_PROPOSAL.value]
  );

  console.log('Creating proposal...');
  const proposalTx = await governorContract.propose(
    [boxContract.address],
    [0],
    [encodedCalldata],
    NEW_PROPOSAL.description
  );
  const proposalTxReceipt = await proposalTx.wait();

  const [proposalCreatedEvent] = proposalTxReceipt.events;
  const { proposalId, startBlock, endBlock } = proposalCreatedEvent.args;

  console.log(`Proposal created successfully!`);
  console.log(`-----------------------------`);
  console.log(`Proposal id: ${proposalId}`);
  // block number at which vote starts (aka snapshot)
  console.log(`Proposal snapshot: ${startBlock}`);
  // block number at which vote ends (aka deadline)
  console.log(`Proposal deadline: ${endBlock}`);
}

propose()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
