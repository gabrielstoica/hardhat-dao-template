// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/governance/TimelockController.sol';

contract TimeLock is TimelockController {
  // minDelay: how long you have to wait before executing an approved proposal
  // proposers: list of addresses that can propose
  // executors: list of addresses that can execute an approved proposal
  // admin account enabled; administration by deployer
  constructor(
    uint256 minDelay,
    address[] memory proposers,
    address[] memory executors
  ) TimelockController(minDelay, proposers, executors, msg.sender) {}
}
