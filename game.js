// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
const BALL_SIZE = 8;
const PADDLE_SPEED = 6;
const BALL_SPEED = 5;
const AI_SPEED = 5.5;

let playerScore = 0;
let computerScore = 0;

// Player paddle
const player = {
    x: 10,
    y: canvas.height / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    dy: 0,
    speed: PADDLE_SPEED
};

// Computer paddle
const computer = {
    x: canvas.width - PADDLE_WIDTH - 10,
    y: canvas.height / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    dy: 0,
    speed: AI_SPEED
};

// Ball
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: BALL_SPEED,
    dy: BALL_SPEED,
    size: BALL_SIZE
};

// Keyboard input
const keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Mouse input for player paddle
document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    
    // Move paddle to mouse position
    player.y = mouseY - player.height / 2;
    
    // Keep paddle within canvas bounds
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }
});

// Arrow keys for player paddle
function handlePlayerInput() {
    if (keys['ArrowUp'] || keys['w'] || keys['W']) {
        player.y -= player.speed;
    }
    if (keys['ArrowDown'] || keys['s'] || keys['S']) {
        player.y += player.speed;
    }
    
    // Keep paddle within canvas bounds
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }
}

// AI logic for computer paddle
function updateAI() {
    const computerCenter = computer.y + computer.height / 2;
    const ballCenter = ball.y;
    
    // Add some difficulty by not always tracking perfectly
    const difficulty = 0.85; // 85% accuracy
    
    if (ballCenter < computerCenter - 35) {
        computer.y -= computer.speed * difficulty;
    } else if (ballCenter > computerCenter + 35) {
        computer.y += computer.speed * difficulty;
    }
    
    // Keep computer paddle within canvas bounds
    if (computer.y < 0) computer.y = 0;
    if (computer.y + computer.height > canvas.height) {
        computer.y = canvas.height - computer.height;
    }
}

// Ball physics
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    // Wall collision (top and bottom)
    if (ball.y - ball.size <= 0 || ball.y + ball.size >= canvas.height) {
        ball.dy = -ball.dy;
        
        // Clamp ball to canvas
        if (ball.y - ball.size <= 0) ball.y = ball.size;
        if (ball.y + ball.size >= canvas.height) ball.y = canvas.height - ball.size;
    }
    
    // Paddle collision - Player
    if (
        ball.x - ball.size <= player.x + player.width &&
        ball.y >= player.y &&
        ball.y <= player.y + player.height
    ) {
        ball.dx = -ball.dx;
        ball.x = player.x + player.width + ball.size;
        
        // Add spin based on where ball hits paddle
        const collidePoint = ball.y - (player.y + player.height / 2);
        collidePoint /= player.height / 2;
        ball.dy = collidePoint * BALL_SPEED;
    }
    
    // Paddle collision - Computer
    if (
        ball.x + ball.size >= computer.x &&
        ball.y >= computer.y &&
        ball.y <= computer.y + computer.height
    ) {
        ball.dx = -ball.dx;
        ball.x = computer.x - ball.size;
        
        // Add spin based on where ball hits paddle
        const collidePoint = ball.y - (computer.y + computer.height / 2);
        collidePoint /= computer.height / 2;
        ball.dy = collidePoint * BALL_SPEED;
    }
    
    // Score points
    if (ball.x - ball.size <= 0) {
        computerScore++;
        resetBall();
        updateScore();
    }
    
    if (ball.x + ball.size >= canvas.width) {
        playerScore++;
        resetBall();
        updateScore();
    }
}

// Reset ball to center
function resetBall() {
    ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        dx: (Math.random() > 0.5 ? 1 : -1) * BALL_SPEED,
        dy: (Math.random() - 0.5) * BALL_SPEED * 2,
        size: BALL_SIZE
    };
}

// Draw functions
function drawPaddle(paddle) {
    ctx.fillStyle = '#00ff88';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00ff88';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.shadowBlur = 0;
}

function drawBall() {
    ctx.fillStyle = '#ff00ff';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff00ff';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
}

function drawCenterLine() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.setLineDash([10, 10]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw center line
    drawCenterLine();
    
    // Draw game elements
    drawPaddle(player);
    drawPaddle(computer);
    drawBall();
}

// Update score display
function updateScore() {
    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('computerScore').textContent = computerScore;
}

// Game loop
function gameLoop() {
    handlePlayerInput();
    updateAI();
    updateBall();
    draw();
    
    requestAnimationFrame(gameLoop);
}

// Reset game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    player.y = canvas.height / 2 - PADDLE_HEIGHT / 2;
    computer.y = canvas.height / 2 - PADDLE_HEIGHT / 2;
    resetBall();
    updateScore();
}

// Event listeners
document.getElementById('resetBtn').addEventListener('click', resetGame);

// Start game
updateScore();
gameLoop();
