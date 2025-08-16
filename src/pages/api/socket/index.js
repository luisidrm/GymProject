import WebSocket, { WebSocketServer } from 'ws';
import http from "node:http"
import next from "next"

export default async function handler(req, res) {
  
  const wss = new WebSocketServer({ noServer: true });
  wss.on('connection', (ws) => {
    console.log("serving function");
    ws.on('message', (message) => {
      console.log('recived: %s', message);
      ws.send(message);
    })
  });

  if (!res.writableEnabled) {
    res.writeHead(101, {
      'Upgrade': 'websocket',
      'Connection': 'Upgrade',
      'Sec-Websocket-Accept': 's3pPLMBiTxaQ9kYGzzhZRbK+x0o=',
      'Sec-Websocket-Protocol': 'chat, superchat',
      'Sec-Websocket-Version': '13'

    });
    res.end();
  }

  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
    wss.emit('connection', ws, req);
  })
}