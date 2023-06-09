
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

function createCell(x, y) {
  const cell = document.createElement("div");
  cell.style.width = cell.style.height = cellSize + "px";
  cell.style.gridColumnStart = x + 1;
  cell.style.gridRowStart = y + 1;
  return cell;
}

function drawSnake() {
  board.innerHTML = "";
  snake.forEach((segment, index) => {
    const cell = createCell(segment.x, segment.y);
    cell.classList.add("snake");
    cell.style.backgroundColor = `hsl(0, 0%, ${100 - (index * 5)}%)`;
    board.appendChild(cell);
  });
}


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

