// https://eth-ropsten.alchemyapi.io/v2/w89w7JLK9PI1wCMCcrfOVd4UJnoGMpgq

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/w89w7JLK9PI1wCMCcrfOVd4UJnoGMpgq",
      accounts: [
        "490cb4dd6affccce5a4372be0f40ccafed56e02daab6917c5106e2c39725da92",
      ],
    },
  },
};
