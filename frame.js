const ZeroClientProvider = require('./zero-provider.js')
const ParentStream = require('iframe-stream').ParentStream
const StreamHandler = require('web3-stream-provider/handler.js')


initializeZeroClient()


function initializeZeroClient(opts) {
  var zeroClientProvider = new ZeroClientProvider()
  var iframeStream = new ParentStream()
  var handlerStream = new StreamHandler(zeroClientProvider)
  
  iframeStream.pipe(handlerStream).pipe(iframeStream)
}