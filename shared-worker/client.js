var worker = new SharedWorker("worker.js");

var id = Number.MAX_SAFE_INTEGER*Math.random()

worker.port.addEventListener("message", function(e) {
  console.log(e.data);
}, false);

worker.port.start();

// post a message to the shared web worker
worker.port.postMessage(id)