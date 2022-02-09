const solc = require("solc");
const path = require('path');
const fs = require('fs');

const contractPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(contractPath,'utf8');


var input = JSON.stringify({
    language: 'Solidity',
    sources: {
        'Lottery.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
});

module.exports = JSON.parse(solc.compile(input)).contracts['Lottery.sol']["Lottery"]