import { parse } from 'node:url';
import { createServer, Server, IncomingMessage, ServerResponse } from 'node:http';
import next from 'next';
import { WebSocket, WebSocketServer } from 'ws';
import { Socket } from 'node:net';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const nextApp = next({ dev: process.env.NODE_ENV !== "production" });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res, parse(req.url || '', true));
  });

  const wss = new WebSocketServer({ noServer: true });

  wss.on('connection', async(ws) => {
    
    console.log('New client connected');
    ws.on('message', (message) => {
      console.log(`Message received: ${message}`);
    })

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  })

  server.on("upgrade", (req, socket, head) => {
    const { pathname } = parse(req.url || "/", true);

    if (pathname === "/_next/webpack-hmr") {
      nextApp.getUpgradeHandler()(req, socket, head);
    }

    if (pathname === "/api/ws") {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    }
  })

  server.listen(3001);
  console.log('Server listening on port 3001');
})