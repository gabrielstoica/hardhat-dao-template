import { ethers } from 'hardhat';

// how long you have to wait before executing an approved proposal (seconds)
export const MIN_DELAY = 3600;
// 7200 blocks ~= 1 day
export const VOTING_DELAY = 7200;
// 50400 blocks ~= 1 week
export const VOTING_PERIOD = 50400;
// 10% of total supply
export const QUORUM_PERCENTAGE = 10;
// ZERO ADDRESS
export const ZERO_ADDRESS = ethers.constants.AddressZero;
// See {IGovernor-ProposalState}
// Pending = 0, Active = 1, Canceled = 2, Defeated = 3, Succeeded = 4, Queued = 5, Expired = 6, Executed = 7;
export const proposalStates = [
  'pending',
  'active',
  'canceled',
  'defeated',
  'succeeded',
  'queued',
  'expired',
  'executed',
];

const createNewProposal = (value: number) => {
  return {
    targetFunction: 'updateValue',
    value,
    description: `Updating Box's value to ${value}`,
  };
};
export const NEW_PROPOSAL = createNewProposal(21);
export const PROPOSAL_ID =
  '112295128847738617007392189428456303691942823658405826614016840985699041024468';
// See {IGovernor}
// 0 = Against, 1 = For, 2 = Abstain
export const VOTE_SUPPORT = 1;
