const PORT = process.env.PORT || 9000
const Browserify = require('browserify')
const express = require('express')
const pageCode = require('fs').readFileSync('./index.html', 'utf-8')

const app = express()

var browserify = Browserify()
browserify.add('./frame.js')
browserify.bundle(function(err, bundle){
  if (err) throw err

  var appCode = bundle.toString()

  app.get('/', deliverPage)
  app.get('/index.html', deliverPage)
  app.get('/bundle.js', deliverApp)

  function deliverPage(req, res){
    res.status(200).send(pageCode)
  }

  function deliverApp(req, res){
    res.status(200).send(appCode)
  }

  app.listen(PORT, function(err){
    if (err) throw err
    console.log('MetaMask ZeroClient iframe server listening on', PORT)
  })

})