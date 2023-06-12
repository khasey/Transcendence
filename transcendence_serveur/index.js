const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const path = require('path');


app.use(cors());
app.use('/', express.static(path.join(__dirname, './transcendence_frontend/src/component/game')));


const server = http.createServer(app);

app.get('/api', (req, res) => {
  console.log("API called");
  const responseData = {
    hello: "Hello from server!",
    checkData: "Here, the data you want!"
  };
  res.json(responseData);
  console.log(responseData);
});

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});

io.on('connection', (socket) => {
  handleConnection(socket);
  
  socket.on('paddleMove', handlePaddleMove);
  
  socket.on('disconnect', () => {
    handleDisconnect(socket);
  });
});

function handleConnection(socket) {
  console.log('Client connected');
}

function handleDisconnect(socket) {
  console.log('Client disconnected');
  socket.broadcast.emit('playerDisconnected');
}

function handlePaddleMove(data) {
  this.broadcast.emit('paddleMove', data);
}

server.listen(3001, '0.0.0.0', () => {
  console.log("Server listening on port 3001");
});
