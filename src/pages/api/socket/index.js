import WebSocket from 'ws';
import http from "node:http"
import next from "next"

const app = next({ dev: true })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const wss = new WebSocket.Server({ server });

  server.on('upgrade', (req, socket, head) => {
    if (req.url === '/socket') {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    } else {
      socket.destroy();
    }
  });

  wss.on('connection', (ws) => {
    console.log("client connected");
    ws.on("message")
  });
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), function done(ws) {
    wss.emit('connection', ws, req);
  });
  server.listen(3000)
})