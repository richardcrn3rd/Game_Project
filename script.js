const paddle = document.querySelector('.paddle');
const ball = document.querySelector('.ball');
const scoreElement = document.getElementById('score');
let score = 0;
let isGameOver = false;

const paddleWidth = paddle.offsetWidth;
const ballDiameter = ball.offsetWidth;

function movePaddle(event) {
    const gameContainerWidth = document.querySelector('.game-container').offsetWidth;
    let newLeft = event.clientX - gameContainerWidth / 2 - paddleWidth / 2;

    // Prevent paddle from moving outside the game container
    newLeft = Math.max(0, Math.min(gameContainerWidth - paddleWidth, newLeft));
    paddle.style.left = newLeft + 'px';
}

function startGame() {
    const gameContainer = document.querySelector('.game-container');
    let ballLeft = Math.random() * (gameContainer.offsetWidth - ballDiameter);
    let ballTop = 0;

    function gameLoop() {
        if (isGameOver) return;

        ball.style.left = ballLeft + 'px';
        ball.style.top = ballTop + 'px';
        ballTop += 5;

        if (ballTop + ballDiameter > gameContainer.offsetHeight) {
            // Ball reached bottom
            if (ballLeft > parseFloat(paddle.style.left) && ballLeft < parseFloat(paddle.style.left) + paddleWidth) {
                // Ball caught by the paddle
                score++;
                scoreElement.textContent = score;
                ballLeft = Math.random() * (gameContainer.offsetWidth - ballDiameter);
                ballTop = 0;
            } else {
                // Game Over
                isGameOver = true;
                alert('Game Over! Your score is ' + score);
            }
        }

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}

document.addEventListener('mousemove', movePaddle);
startGame();