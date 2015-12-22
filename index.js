const IframeProvider = require('./iframe-provider.js')
const Web3 = require('web3')


global.web3 = new Web3(getProvider())



function getProvider(){

  var provider = null
  if (global.web3) {
    console.log('MetaMask ZeroClient - using environmental web3 provider')
    provider = global.web3.currentProvider
  } else {
    console.log('MetaMask ZeroClient - ready to rock!')
    provider = new IframeProvider({
      zeroClientProvider: 'http://localhost:9001',
      sandboxAttributes: ['allow-scripts', 'allow-popups', 'allow-same-origin'],
    })
  }

}