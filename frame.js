const ZeroClientProvider = require('web3-provider-engine/zero')
const ParentStream = require('iframe-stream').ParentStream
const StreamHandler = require('web3-stream-provider/handler.js')

console.log('yes, this is iframe')

initializeZeroClient({
  rpcUrl: 'https://rpc.metamask.io/',
})


function initializeZeroClient(opts) {
  var zeroClientProvider = new ZeroClientProvider(opts)
  zeroClientProvider.on('block', function(block){
    console.log('BLOCK CHANGED:', '#'+block.number.toString('hex'), '0x'+block.hash.toString('hex'))
  })

  var iframeStream = new ParentStream()
  var handlerStream = new StreamHandler(zeroClientProvider)
  
  iframeStream.pipe(handlerStream).pipe(iframeStream)
}