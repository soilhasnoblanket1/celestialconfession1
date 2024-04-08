const { createServer } = require('http');
const app = require('./app.js'); // Import the Express app

const server = createServer(app);

async function handleRequest(request) {
  const { readable, writable } = new TransformStream();

  const responsePromise = new Promise(resolve => {
    const writer = writable.getWriter();
    const responseStream = new ReadableStream({
      start(controller) {
        writer.write({ body: controller, done: false });
        app(request, {}, (err) => {
          writer.close();
          resolve(response);
        });
      }
    });
  });

  return responsePromise;
}

server.listen(); // Start the server
