const board = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");

const gridSize = 20;
const cellSize = 20;
const initialSnakeLength = 4;
const initialSpeed = 200;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 10 };
let direction = "right";
let score = 0;
let speed = initialSpeed;
let gameLoop;

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

