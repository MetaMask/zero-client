const ProviderEngine = require('web3-provider-engine')
const CacheSubprovider = require('web3-provider-engine/subproviders/cache.js')
const StaticSubprovider = require('web3-provider-engine/subproviders/static.js')
const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js')
const VmSubprovider = require('web3-provider-engine/subproviders/vm.js')
const LightWalletSubprovider = require('web3-provider-engine/subproviders/lightwallet.js')
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js')

module.exports = ZeroClientProvider


function ZeroClientProvider(opts){
  opts = opts || {}

  var engine = new ProviderEngine()

  // static - hardcoded responses
  engine.addProvider(new StaticSubprovider({
    web3_clientVersion: 'MetaMask-ZeroClient/v0.0.0/javascript',
    net_version: '1',
    net_listening: true,
    net_peerCount: '0xc',
    eth_protocolVersion: '63',
    eth_hashrate: '0x0',
    eth_mining: false,
    eth_syncing: true,
  }))

  // cache
  engine.addProvider(new CacheSubprovider())

  // filters - e.g.: eth_newBlockFilter
  engine.addProvider(new FilterSubprovider())

  // vm - e.g.: eth_call
  engine.addProvider(new VmSubprovider())

  // data source - e.g.: eth_getBalance
  engine.addProvider(new RpcSubprovider({
    rpcUrl: opts.rpcUrl || 'https://rpc.metamask.io/',
  }))

  engine.on('block', function(block){
    console.log('================================')
    console.log('BLOCK CHANGED:', '#'+block.number.toString('hex'), '0x'+block.hash.toString('hex'))
    console.log('================================')
  })

  // start polling for blocks
  engine.start()

  return engine
}