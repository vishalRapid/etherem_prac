require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: 'rinkeby',
  networks:{
    hardhat:{

    },
    rinkeby:{
      url: 'https://rinkeby.infura.io/v3/ab4c64fede5f491fbc8643d576a14d91',
      accounts:['5576bd48fbcffe30eaf33a537db59468adad0e76ef47b25de569700ca9d7ea27']
    }
  },
  mocha: {
    timeout: 40000
  }
};
