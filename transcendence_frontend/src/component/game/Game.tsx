import React, { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import Score from './Score';
import styles from './game.module.css';

const Game: React.FC = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paddleWidth = 10;
  const paddleHeight = 100;
  const ballRadius = 10;
  const netWidth = 2;
  const paddleGap = 10;
  let player1Score = 0;
  let player2Score = 0;
  let paddle1Y = 0;
  let paddle2Y = 0;
  let ballX = 50;
  let ballY = 50;
  let ballSpeedX = 3;
  let ballSpeedY = 3;
  let upArrowPressed = false;
  let downArrowPressed = false;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        upArrowPressed = true;
      } else if (event.key === 'ArrowDown') {
        downArrowPressed = true;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        upArrowPressed = false;
      } else if (event.key === 'ArrowDown') {
        downArrowPressed = false;
      }
    };

    const updatePaddlePosition = () => {
      if (upArrowPressed && paddle1Y > 0) {
        paddle1Y -= 5;
      } else if (downArrowPressed && paddle1Y + paddleHeight < canvas.height) {
        paddle1Y += 5;
      }

      socket.emit('paddleMove', { y: paddle1Y });
    };

    const drawRectangle = (x: number, y: number, width: number, height: number, color: string) => {
      context.fillStyle = color;
      context.fillRect(x, y, width, height);
    };

    const drawCircle = (x: number, y: number, radius: number, color: string) => {
      context.fillStyle = color;
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
          'white'
        );
      }
    };

    const drawGame = () => {
      drawRectangle(0, 0, canvas.width, canvas.height, '#00d9ff00');
      drawRectangle(paddleGap, paddle1Y, paddleWidth, paddleHeight, 'white');
      drawRectangle(
        canvas.width - paddleWidth - paddleGap,
        paddle2Y,
        paddleWidth,
        paddleHeight,
        'white'
      );
      drawCircle(ballX, ballY, ballRadius, 'white');
      drawNet();
    };

    const updateGame = () => {
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -1;
      }

      if (
        ballX - ballRadius < paddleGap + paddleWidth &&
        ballY + ballRadius > paddle1Y &&
        ballY - ballRadius < paddle1Y + paddleHeight
      ) {
        ballSpeedX= -1;
      } else if (
        ballX + ballRadius > canvas.width - paddleGap - paddleWidth &&
        ballY + ballRadius > paddle2Y &&
        ballY - ballRadius < paddle2Y + paddleHeight
      ) {
        ballSpeedX = -1;
      }

      if (ballX + ballRadius > canvas.width) {
        player1Score++;
        resetBall();
      } else if (ballX - ballRadius < 0) {
        player2Score++;
        resetBall();
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      drawGame();
      updatePaddlePosition();
      drawScores();
      requestAnimationFrame(updateGame);
    };

    const resetBall = () => {
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;

    };
    const drawScores = () => {
      context.fillStyle = 'white';
      context.font = '24px Arial';
      context.fillText(`Player 1: ${player1Score}`, canvas.width / 4, 30);
      context.fillText(`Player 2: ${player2Score}`, (canvas.width * 3) / 4, 30);
    };

    const socket = io('http://192.168.1.71:3001/');

    socket.on('paddleMove', (data: { y: number }) => {
      paddle2Y = data.y;
    });

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    updateGame();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className={styles.all}>
      <div className={styles.game}>
        <canvas ref={canvasRef} id="pong" width={1000} height={500} />
      </div>
      <Score />
    </div>
  );
};

export default Game;
