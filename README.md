# Simple Hardhat DAO Template

This project is a Hardhat DAO boilerplate inspired by [PatrickAlphaC repo](https://github.com/PatrickAlphaC/dao-template/) with some changes.  It is based on the [OpenZeppelin Governance](https://docs.openzeppelin.com/contracts/4.x/governance#governor) model and utilise the hardhat-deploy plugin for smart contract deployment.

## Features

This template includes the following features:

- A basic DAO contract with the ability to create proposals, vote on proposals, and execute proposals.
- The DAO contract is based on the OpenZeppelin Governance model, which includes role-based access control with different roles such as proposer, voter, and executor.
- Hardhat-deploy plugin for easy deployment of smart contracts to various Ethereum networks.
- Example tests for the DAO contract using Hardhat's built-in testing framework.

## Installation

1. Clone this repository to your local machine:
```bash
git clone https://github.com/gabrielstoica/hardhat-dao-template
```
2. Change directory to the cloned project:
```bash
cd hardhat-dao-template
```
3. Install dependencies:
```bash
yarn install
```
4. Update the `hardhat.config.js` file and `.env` with your deployment configurations and network settings, such as `PRIVATE_KEY`, `INFURA_API_KEY` and `POLYGONSCAN_API_KEY`.
5. Compile the contracts:
```bash
yarn hardhat compile
```
6. Deploy the DAO contract to a testnet or mainnet using the hardhat-deploy plugin:
```bash
yarn hardhat deploy
```

## Contributing

Contributions to this DAO template are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE). Feel free to use, modify, and distribute this template for your own DAO projects.
