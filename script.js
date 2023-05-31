const board = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");

const gridSize = 20;
const cellSize = 20;
const initialSnakeLength = 4;
const initialSpeed = 200;


function createCell(x, y) {
  const cell = document.createElement("div");
  cell.style.width = cell.style.height = cellSize + "px";
  cell.style.gridColumnStart = x + 1;
  cell.style.gridRowStart = y + 1;
  return cell;
}