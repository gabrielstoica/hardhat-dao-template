import { ethers, network } from 'hardhat';
import { MIN_DELAY, NEW_PROPOSAL, VOTING_PERIOD } from '../../config/general';
import { moveBlocks } from '../../utils/helper-functions';

async function queueAndExecute() {
  const boxContract = await ethers.getContract('Box');
  const governorContract = await ethers.getContract('GovernorContract');

  // if network is not a live one, move blocks
  // so we can queue the proposal
  if (!network.live) {
    await moveBlocks(VOTING_PERIOD);
  }

  const encodedCalldata = boxContract.interface.encodeFunctionData(
    NEW_PROPOSAL.targetFunction,
    [NEW_PROPOSAL.value]
  );
  const descriptionHash = ethers.utils.id(NEW_PROPOSAL.description);

  // if a timelock was set up, the first step to execution is queueing
  const queueTx = await governorContract.queue(
    [boxContract.address],
    [0],
    [encodedCalldata],
    descriptionHash
  );
  await queueTx.wait();

  // if network is not a live one, move blocks
  // so we can execute the proposal
  if (!network.live) {
    await moveBlocks(MIN_DELAY);
  }

  const executeTx = await governorContract.execute(
    [boxContract.address],
    [0],
    [encodedCalldata],
    descriptionHash
  );
  await executeTx.wait();

  const newValue = await boxContract.getValue();
  if (parseInt(newValue) === NEW_PROPOSAL.value)
    console.log(`Proposal successfully executed!\nBox's value: ${newValue} `);
}

queueAndExecute()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
