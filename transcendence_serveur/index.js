const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use('/', express.static(path.join(__dirname, './transcendence_frontend/src/component/game')));
app.use(express.json()); // Ajout du middleware pour le parsing JSON

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

app.post('/api/scores', (req, res) => {
  const { player1Score, player2Score } = req.body;

  // Traitez les scores reçus du client comme vous le souhaitez
  // Par exemple, vous pouvez les stocker en base de données ou les utiliser pour mettre à jour un état du jeu sur le serveur

  console.log('Received scores from the client:');
  console.log('Player 1 Score:', player1Score);
  console.log('Player 2 Score:', player2Score);

  // Envoyez les scores des deux joueurs à tous les clients connectés
  io.emit('scoresUpdate', { player1Score, player2Score });

  res.json({ player1Score, player2Score });
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