import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Score from './Score';
import styles from './game.module.css';

const Game: React.FC = () => {
const canvasRef = useRef<HTMLCanvasElement>(null);
const trail: { x: number; y: number }[] = [];
const paddleWidth = 10;
const paddleHeight = 80;
const ballRadius = 10;
const netWidth = 2;
const paddleGap = 40;
let player1Score = 0;
let player2Score = 0;
let ScoreServerPlayer1 = player1Score;
let ScoreServerPlayer2 = player2Score;
let paddle1Y = 0;
let paddle2Y = 0;
let ballX = 50;
let ballY = 50;
let prevBallX = ballX;
let prevBallY = ballY;
let ballSpeedX = 4;
let ballSpeedY = 4;
let upArrowPressed = false;
let downArrowPressed = false;
const serverIP = '192.168.1.71'; // Remplacez par l'adresse IP du serveur
const serverPort = 3001;

const [gameStarted, setGameStarted] = useState(false);



useEffect(() => {
  if (!gameStarted) {
    return;
  }  
const canvas = canvasRef.current;
const context = canvas?.getContext('2d');
const parentDiv = canvas?.parentElement;

if (!canvas || !context || !parentDiv) {
  return;
}
const setCanvasSize = () => {
  canvas.width = parentDiv.clientWidth;
  canvas.height = parentDiv.clientHeight;
};

setCanvasSize(); // Initial set up of size

// Set up a ResizeObserver to monitor size changes of parent div
const observer = new ResizeObserver(setCanvasSize);
observer.observe(parentDiv);


const updatePaddlePosition = () => {
  if (upArrowPressed && paddle1Y > 0) {
    paddle1Y -= 5;
  } else if (downArrowPressed && paddle1Y + paddleHeight < canvas.height) {
    paddle1Y += 5;
  }

  socket.emit('paddleMove', { y: paddle1Y });
};

const drawRectangle = (x: number, y: number, width: number, height: number, color1: string, color2: string) => {
  // Sauvegarder l'état du contexte actuel
  context.save();

  // Créer un dégradé linéaire
  const gradient = context.createLinearGradient(x, y, x, y + height);
  gradient.addColorStop(0, '#009fbb');
  gradient.addColorStop(0.5, '#00d9ff'); // couleur en haut du paddle
  gradient.addColorStop(1, '#009fbb'); // couleur en bas du paddle

  // Définir le dégradé comme couleur de remplissage
  context.fillStyle = gradient;

  // Définir les propriétés de l'ombre
  context.shadowColor = '#00d9ff';
  context.shadowBlur = 80;
  context.shadowOffsetX = 1;
  context.shadowOffsetY = 1;

  // Dessiner les cercles en haut et en bas du paddle
  context.beginPath();
  context.arc(x + width / 2, y, width / 2, 0, Math.PI * 2, false); // top circle
  context.arc(x + width / 2, y + height, width / 2, 0, Math.PI * 2, false); // bottom circle
  context.closePath();
  context.fill();

  // Dessiner le rectangle du paddle
  context.fillRect(x, y, width, height);

  // Restaurer l'état du contexte
  context.restore();
};


const drawCircle = (x: number, y: number, radius: number, color1: string, color2: string) => {
  // Créer un dégradé radial
  const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, color1); // couleur au centre du cercle
  gradient.addColorStop(1, 'rgb(89, 0, 255, 0.04)'); // couleur à la périphérie du cercle

  // Définir le dégradé comme couleur de remplissage
  context.fillStyle = gradient;

  // Dessiner le cercle
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.closePath();
  context.fill();
};



const drawNet = () => {
  for (let i = 0; i <= canvas.height; i += 15) {
    drawRectangle(
      canvas.width / 2 - netWidth / 2,
      i,
      netWidth,
      canvas.height / 30,
      'white',
      'white'
    );
  }
};

const drawGame = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawRectangle(paddleGap, paddle1Y, paddleWidth, paddleHeight, 'white', 'white');
  drawRectangle(
    canvas.width - paddleWidth - paddleGap,
    paddle2Y,
    paddleWidth,
    paddleHeight,
    'white',
    'white'
  );
  trail.push({ x: prevBallX, y: prevBallY });
  drawCircle(ballX, ballY, ballRadius, 'white', 'white');
  const trailLength = 15; // Longueur de la traînée
  const trailOpacityStep = 1 / trailLength; // Pas d'opacité pour chaque cercle

  for (let i = trail.length - 1; i >= 0; i--) {
    const { x, y } = trail[i];
    const alpha = 0.8 - (trail.length - i) * trailOpacityStep;
    // degrade ball
    drawCircle(x, y, ballRadius, `rgba(0, 217, 255, ${alpha})`, 'rgba(0, 217, 255, 0)');

    if (trail.length - i >= trailLength) {
      break;
    }
  }
  drawNet();
  drawScores();
  if (trail.length > trailLength) {
    trail.splice(0, trail.length - trailLength);
  }
};

const updateGame = () => {
  updatePaddlePosition();

  ballX += ballSpeedX;
  ballY += ballSpeedY;
  prevBallX = ballX;
  prevBallY = ballY;

  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    ballSpeedY = -ballSpeedY;
  }

  if (
    ballX - ballRadius < paddleGap + paddleWidth &&
    ballY + ballRadius > paddle1Y &&
    ballY - ballRadius < paddle1Y + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  } else if (
    ballX + ballRadius > canvas.width - paddleGap - paddleWidth &&
    ballY + ballRadius > paddle2Y &&
    ballY - ballRadius < paddle2Y + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballX - ballRadius < 0) {
    player2Score++;
    sendScoresToServer();
    resetBall();
  } else if (ballX + ballRadius > canvas.width) {
    player1Score++;
    sendScoresToServer();
    resetBall();
  }

  drawGame();
  requestAnimationFrame(updateGame);
};



const resetBall = () => {
  trail.length = 0;
  ballX = canvas.width / 2;
  ballY = getRandomNumberInRange(canvas.height / 2 - 100, canvas.height / 2 + 100);

  const randomDirection = Math.random() < 0.5 ? -1 : 1;
  ballSpeedX = ballSpeedX * randomDirection;
  ballSpeedY = ballSpeedY * randomDirection;
};



const sendScoresToServer = () => {
   // Remplacez par le port du serveur

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


const socket: Socket = io('http://192.168.1.71:3001/');

socket.on('paddleMove', (data: { y: number }) => {
  paddle2Y = data.y;
});

socket.on('scoresUpdate', (data: { player1Score: number; player2Score: number }) => {
  ScoreServerPlayer1 = data.player1Score;
  ScoreServerPlayer2 = data.player2Score;
});

const drawScores = () => {
  const fontSize = canvas.width * 0.15;  // 10% of the width of the canvas
  context.font = `${fontSize}px Roboto`;
  
  const scoreText1 = ` ${ScoreServerPlayer1}`;
  const scoreText2 = ` ${ScoreServerPlayer2}`;

  const scoreText1Width = context.measureText(scoreText1).width;
  const scoreText2Width = context.measureText(scoreText2).width;
  context.fillStyle = 'rgba(255, 255, 255, 0.08)';
  context.fillText(scoreText1, (canvas.width - scoreText1Width) / 3.5, canvas.height / 1.70);
  context.fillText(scoreText2, (canvas.width - scoreText2Width) / 1.5, canvas.height / 1.70);
};

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

updateGame();

return () => {
  document.removeEventListener('keydown', handleKeyDown);
  document.removeEventListener('keyup', handleKeyUp);
  observer.disconnect();
};

  }, [gameStarted]);

  const handleStartClick = () => {
    setGameStarted(true);
  };

  const getRandomNumberInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
    };
    
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

function handleKeyDown(this: Document, ev: KeyboardEvent) {
  throw new Error('Function not implemented.');
}
function handleKeyUp(this: Document, ev: KeyboardEvent) {
  throw new Error('Function not implemented.');
}

