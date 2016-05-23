const Web3 = require('web3')
const setupProvider = require('./lib/setup-provider.js')

//
// setup web3
//

var provider = setupProvider()
var web3 = new Web3(provider)
web3.currentProvider = provider
web3.setProvider = function(){
  console.log('MetaMask - overrode web3.setProvider')
}

//
// export web3
//

global.web3 = web3
