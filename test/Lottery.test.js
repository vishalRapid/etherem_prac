const Web3 = require('web3');
const ganache = require('ganache-cli')
const web3 = new Web3(ganache.provider());
const idx = require("../compile")
const {expect} = require('chai')
let lottery;
let accounts;


beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts();

    console.log({accounts})

    lottery = await new web3.eth.Contract(idx.abi).deploy({data: idx.evm.bytecode.object}).send({from: accounts[0], gas: 1000000})
})


describe("Lottery", ()=>{

    it("Check manager", async()=>{
        const manager = await lottery.methods.manager().call({from: accounts[0]})
        expect(manager).to.be.equals(accounts[0])
    })

    it("enter using multiple account", async()=>{
        await lottery.methods.enter().send({from: accounts[1], value: web3.utils.toWei('0.02','ether')})
        await lottery.methods.enter().send({from: accounts[2], value: web3.utils.toWei('0.02','ether')})
        const participants = await lottery.methods.getAllParticipants().call({from: accounts[0]})
        console.log({participants})
    })

})