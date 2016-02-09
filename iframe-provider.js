const Iframe = require('iframe')
const StreamProvider = require('web3-stream-provider')
const IframeStream = require('iframe-stream').IframeStream

module.exports = IframeProvider


function IframeProvider(opts) {
  opts = opts || {}
  var frame = Iframe({
    src: opts.zeroClientProvider || 'https://zero.metamask.io/',
    container: document.head,
    sandboxAttributes: opts.sandboxAttributes || ['allow-scripts', 'allow-popups'],
  })
  var iframe = frame.iframe
  var iframeStream = new IframeStream(iframe)
  var provider = new StreamProvider()
  
  provider.pipe(iframeStream).pipe(provider)

  this.sendAsync = provider.sendAsync.bind(provider)

  iframe.addEventListener('load', function(){ console.log('saw iframe loaded') })
  iframe.onload = function(){ console.log('saw iframe loaded janko') }

  // id mgmt - e.g.: eth_signTransaction
  // engine.addProvider(new LightWalletSubprovider())
  
  //
  // actually reconstruct provider engine here?
  // wait lemme think about that... means two pollers
  //

  return provider
}

IframeProvider.prototype.send = function(){
  throw new Error('IframeProvider - Synchronous JSON RPC not supported.')
}
