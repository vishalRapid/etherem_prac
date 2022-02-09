const Web3 = require('web3');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const provider = new HDWalletProvider(
    'maid romance blame mixed tail delay market cream eagle route heavy physical',
    'https://rinkeby.infura.io/v3/ab4c64fede5f491fbc8643d576a14d91'
)
const web3 = new Web3(provider);
const idx = require("./compile")


const deploy  = async ()=>{


    const account = await web3.eth.getAccounts()

    console.log(`Attempting to deploy contract using account ${account[0]}`)

    const result = await new web3.eth.Contract(idx.abi).deploy({data: idx.evm.bytecode.object}).send({from: account[0], gas: '1000000'})
    console.log(`contract deployed to ${result.options.address}`)
}

deploy()