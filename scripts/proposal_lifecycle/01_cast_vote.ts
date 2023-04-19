import { ethers, network } from 'hardhat';
import { moveBlocks } from '../../utils/helper-functions';
import {
  PROPOSAL_ID,
  VOTE_SUPPORT,
  VOTING_DELAY,
  proposalStates,
} from '../../config/general';

async function castVote() {
  // if network is not a live one, move blocks
  // so we can simulate casting a vote
  if (!network.live) {
    await moveBlocks(VOTING_DELAY);
  }

  const governorContract = await ethers.getContract('GovernorContract');

  const voteTx = await governorContract.castVote(PROPOSAL_ID, VOTE_SUPPORT);
  await voteTx.wait();

  console.log('Vote successfully sent!');
  const state = await governorContract.state(PROPOSAL_ID);
  console.log(`Proposal state after voting: ${proposalStates[state]}`);
}

castVote()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
