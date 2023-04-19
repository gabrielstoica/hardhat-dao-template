import { ethers } from 'hardhat';
import { PROPOSAL_ID, proposalStates } from '../config/general';

async function getProposalState(proposalId: string) {
  const governorContract = await ethers.getContract('GovernorContract');

  console.log(`Querying proposal ${proposalId}`);
  console.log(`-----------------------------`);

  const stateId = await governorContract.state(proposalId);
  const snapshot = await governorContract.proposalSnapshot(proposalId);
  const deadline = await governorContract.proposalDeadline(proposalId);

  console.log(`State: ${proposalStates[stateId]}`);
  // block number at which vote starts
  console.log(`Snapshot: ${snapshot}`);
  // block number at which vote ends
  console.log(`Deadline: ${deadline}`);
}

getProposalState(PROPOSAL_ID)
  .then(() => process.exit(0))
  .catch((error) => {
    if (error.reason) console.log(error.reason);
    else console.log(error);
    process.exit(1);
  });
