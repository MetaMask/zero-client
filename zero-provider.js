const ProviderEngine = require('web3-provider-engine')
const StaticProvider = require('web3-provider-engine/subproviders/static.js')
const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js')
const VmSubprovider = require('web3-provider-engine/subproviders/vm.js')
const LightWalletSubprovider = require('web3-provider-engine/subproviders/lightwallet.js')
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js')

module.exports = ZeroClientProvider


function ZeroClientProvider(opts){
  opts = opts || {}

  var engine = new ProviderEngine()

  // static - e.g.: web3_clientVersion
  engine.addSource(new StaticProvider({
    web3_clientVersion: 'MetaMask-ZeroClient/v0.0.0/javascript',
    net_version: '1',
    net_listening: true,
    net_peerCount: '0xc',
    eth_protocolVersion: '63',
    eth_hashrate: '0x0',
    eth_mining: false,
    eth_syncing: true,
  }))

  // filters - e.g.: eth_newBlockFilter
  engine.addSource(new FilterSubprovider({
    rootProvider: engine,
  }))

  // vm - e.g.: eth_call
  engine.addSource(new VmSubprovider({
    rootProvider: engine,
  }))

  // id mgmt - e.g.: eth_signTransaction
  engine.addSource(new LightWalletSubprovider({
    rootProvider: engine,
  }))

  // data source - e.g.: eth_getBalance
  engine.addSource(new RpcSubprovider({
    rpcUrl: 'https://rpc.metamask.io/',
  }))

  // start polling for blocks
  engine.start()

  engine.on('block', function(block){
    // lazy hack - move caching and current block to engine
    engine.currentBlock = block
    console.log('================================')
    console.log('BLOCK CHANGED:', '#'+block.number.toString('hex'), '0x'+block.hash.toString('hex'))
    console.log('================================')
  })

  return engine
}