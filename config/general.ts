import { ethers } from 'hardhat';

export const developmentChains = ['hardhat', 'localhost'];
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
