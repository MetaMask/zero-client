const IframeProvider = require('./iframe-provider.js')
const Web3 = require('web3')

var provider = getProvider()
var web3 = new Web3(provider)
web3.currentProvider = provider
web3.setProvider = function noop(){}

global.web3 = web3


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

  return provider

}