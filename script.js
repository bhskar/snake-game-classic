
const board = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");

// Set up game variables
const gridSize = 20;
const cellSize = 20;
const initialSnakeLength = 4;
const initialSpeed = 200;

let snake = [{ x: 10, y: 10 }]; //array of objects with x and y properties
let food = { x: 15, y: 10 }; // object with x and y properties
let direction = "right";
let score = 0;
let speed = initialSpeed;
let gameLoop;

// Set up keyboard event listener to control snake movement
document.addEventListener("keydown", changeDirection);

// responsible for creating a cell element in the game grid based on the provided x and y coordinates
function createCell(x, y) {
  const cell = document.createElement("div");
  cell.style.width = cell.style.height = cellSize + "px";
  cell.style.gridColumnStart = x + 1;
  cell.style.gridRowStart = y + 1;
  return cell; // returns the created cell element
}

//// Draw the snake on the canvas
function drawSnake() {
  board.innerHTML = "";
  snake.forEach((segment, index) => {
    const cell = createCell(segment.x, segment.y);
    cell.classList.add("snake");
    cell.style.backgroundColor = `hsl(0, 0%, ${100 - (index * 5)}%)`;
    board.appendChild(cell);
  });
}

//// Draw the food on the canvas
function drawFood() {
  const cell = createCell(food.x, food.y);
  cell.classList.add("food");
  cell.style.backgroundColor = "lime";
  board.appendChild(cell);
}

// function to move the snake based on the current direction
function moveSnake() {
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score+=10;
    speed -= 5;
    scoreDisplay.textContent = "Score: " + score;
    generateFood();
  } else {
    snake.pop();
  }
}

// Generate new food at a random position
function generateFood() {
  food = {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize)
  };

  // Ensure food is not generated on the snake's body
  if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    generateFood();
  }
}

// Handle keyboard events to change the direction of the snake
function changeDirection(event) {
  const key = event.keyCode;

  if (key === 38 && direction !== "down") {
    direction = "up";
  } else if (key === 40 && direction !== "up") {
    direction = "down";
  } else if (key === 37 && direction !== "right") {
    direction = "left";
  } else if (key === 39 && direction !== "left") {
    direction = "right";
  }
}

// Check for collision with the walls or the snake's body
function checkCollision() {
  const head = snake[0];

  if (
    head.x < 0 ||
    head.x >= gridSize ||
    head.y < 0 ||
    head.y >= gridSize ||
    snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y) // check for snake body collision
  ) 
  {
    clearInterval(gameLoop);
    alert("Game over!");
  }
}

function gameOver() {
  clearInterval(gameLoop);
  const gameBoard = document.getElementById("game-board");
  const gameOverText = document.getElementById("game-over-text");
  const playAgainBtn = document.getElementById("play-again");

  gameBoard.style.opacity = "0.5";
  gameOverText.textContent = "Game Over!";
  document.getElementById("game-over").style.display = "block";

  playAgainBtn.addEventListener("click", () => {
    gameBoard.style.opacity = "1";
    document.getElementById("game-over").style.display = "none";
    startGame();
  });
}

function gameLoopFn() {
  drawSnake();
  drawFood();
  moveSnake();
  checkCollision();
}

//Start the game
function startGame() {
  score = 0;
  speed = initialSpeed;
  snake = Array.from({ length: initialSnakeLength }, (_, index) => ({ x: 10 - index, y: 10 }));
  direction = "right";
  scoreDisplay.textContent = "Score: " + score;
  generateFood();
  gameLoop = setInterval(gameLoopFn, speed);
}

startGame();
