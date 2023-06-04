
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


