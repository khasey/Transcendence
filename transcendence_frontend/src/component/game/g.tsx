// Déplacer ces variables en dehors du composant pour qu'elles soient réutilisables
const paddleWidth = 10;
const paddleHeight = 80;
const ballRadius = 10;
const netWidth = 2;
const paddleGap = 40;
const serverIP = '192.168.1.71'; // Remplacez par l'adresse IP du serveur
const serverPort = 3001; // Remplacez par le port du serveur

// Extraire la logique d'envoi des scores au serveur en une fonction distincte
const sendScoresToServer = (player1Score, player2Score) => {
  const url = `http://${serverIP}:${serverPort}/api/scores`; // URL de l'API du serveur

  const data = {
    player1Score: player1Score,
    player2Score: player2Score
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      console.log('Scores sent to the server successfully.');
    } else {
      console.error('Failed to send scores to the server.');
    }
  })
  .catch(error => {
    console.error('An error occurred while sending scores to the server:', error);
  });
};

// Votre composant reste le même jusqu'ici ...

// Extraction de la logique de gestion des événements clavier dans un autre useEffect
useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp') {
      upArrowPressed = true;
    } else if (event.key === 'ArrowDown') {
      downArrowPressed = true to:onNavigationItemSelectedListener ----------------------------------------------------------------------------
Voici une version améliorée de votre code. J'ai essayé de le rendre plus lisible en le découpant en plusieurs composants et en utilisant des constantes pour certaines valeurs hardcodées. J'ai également utilisé `useCallback` pour éviter la création de nouvelles instances de fonctions à chaque rendu.

```jsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import Score from './Score';
import styles from './game.module.css';
import { Paddle } from './Paddle';
import { Ball } from './Ball';
import { Net } from './Net';

const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 80;
const BALL_RADIUS = 10;
const NET_WIDTH = 2;
const PADDLE_GAP = 40;
const SERVER_IP = '192.168.1.71';
const SERVER_PORT = 3001;

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartClick = () => {
    setGameStarted(true);
  };

  useEffect(() => {
    if (!gameStarted) {
      return;
    }
  
    const game = new Game(
      canvasRef.current,
      PADDLE_WIDTH,
      PADDLE_HEIGHT,
      BALL_RADIUS,
      NET_WIDTH,
      PADDLE_GAP,
      SERVER_IP,
      SERVER_PORT,
    );
  
    game.start();

    return () => {
      game.stop();
    };
  }, [gameStarted]);

  return (
    <div className={styles.all}>
      <div className={styles.game}>
        {gameStarted ? (
          <canvas ref={canvasRef} id="pong" width={1500} height={500} />
        ) : (
          <button onClick={handleStartClick}>Commencer le jeu</button>
        )}
      </div>
      <Score />
    </div>
  );
};

export default Game;
