document.addEventListener('DOMContentLoaded', () => {
    const paddle = document.getElementById('paddle');
    const ball = document.getElementById('ball');
    const startButton = document.getElementById('startButton');
    
    let ballSpeedX = 4;
    let ballSpeedY = 4;
    let gameInterval;

    const startGame = () => {
        ball.style.top = '50%';
        ball.style.left = '50%';
        ballSpeedX = 4;
        ballSpeedY = 4;
        startButton.disabled = true;

        gameInterval = setInterval(() => {

            let ballRect = ball.getBoundingClientRect();
            let containerRect = document.querySelector('.game-container').getBoundingClientRect();
            let paddleRect = paddle.getBoundingClientRect();


            if (ballRect.top <= containerRect.top || ballRect.bottom >= containerRect.bottom) {
                ballSpeedY = -ballSpeedY;
            }
            if (ballRect.left <= containerRect.left || ballRect.right >= containerRect.right) {
                ballSpeedX = -ballSpeedX;
            }


            if (ballRect.bottom >= paddleRect.top &&
                ballRect.right >= paddleRect.left &&
                ballRect.left <= paddleRect.right) {
                ballSpeedY = -ballSpeedY;
                ball.style.backgroundColor = getRandomColor();
            }

            ball.style.top = (ballRect.top + ballSpeedY) + 'px';
            ball.style.left = (ballRect.left + ballSpeedX) + 'px';
        }, 20);

        document.addEventListener('mousemove', (event) => {
            let x = event.clientX - paddle.offsetWidth / 2;
            x = Math.max(0, Math.min(window.innerWidth - paddle.offsetWidth, x));
            paddle.style.left = x + 'px';
        });
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    startButton.addEventListener('click', startGame);
});