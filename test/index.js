const wzrd = require('wzrd')
const PORT_MAIN = 9000
const PORT_FRAME = 9001

wzrd.http({
  entries: [{from: 'index.js', to: 'bundle.js'}]
}).listen(PORT_MAIN, listening)

wzrd.http({
  entries: [{from: 'frame.js', to: 'bundle.js'}]
}).listen(PORT_FRAME, listening)

function listening(err) {
  if (err) {
    console.error('error starting server', err)
    process.exit(1)
  }
  console.error('main server started at http://localhost:' + PORT_MAIN)
  console.error('frame server started at http://localhost:' + PORT_FRAME)
}