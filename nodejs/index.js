const path = require('path');
const express = require('express');
const osc = require('osc');
const WebSocket = require('ws');

const udp = new osc.UDPPort({
  localAddress: "0.0.0.0",
  localPort: 8000,
  remoteAddress: "127.0.0.1",
  remotePort: 8001,
});

udp.on('ready', () => {
  console.log('udp is ready !');
});

udp.on('message', (msg) => {
  // do whatever you want to do with the incoming messages in Nodejs
});

udp.open();

const wss = new WebSocket.Server({
  port: 9000,
});

wss.on("connection", (socket) => {
  console.log("A Web Socket connection has been established!");
  const socketPort = new osc.WebSocketPort({
    socket: socket,
  });

  // forward all incoming UDP messages to the web page
  const relay = new osc.Relay(udp, socketPort, {
    raw: true,
  });
});

const app = express();

app.use('/osc', express.static(path.join(__dirname, 'node_modules/osc')));
app.use(express.static('public'));

const port = 3000;
app.listen(process.env.PORT || port, () => {
  console.log(`app listening at http://localhost:${port}`);
});