const gameBoard = document.getElementById("gameBoard");
const gameBoardContext = gameBoard.getContext("2d");

// Velocities of the snake
let dx = 10;
let dy = 0;

let snake = [
	{ x: 200, y: 200 },
	{ x: 190, y: 200 },
	{ x: 180, y: 200 },
	{ x: 170, y: 200 },
	{ x: 160, y: 200 },
];

const drawSnake = () => {
	snake.forEach((part) => {
		gameBoardContext.fillStyle = "red";
		gameBoardContext.strokeStyle = "black";
		gameBoardContext.fillRect(part.x, part.y, 10, 10);
		gameBoardContext.strokeRect(part.x, part.y, 10, 10);
	});
};

const clearCanvas = () => {
	gameBoardContext.fillStyle = "black";
	gameBoardContext.strokeStyle = "white";
	gameBoardContext.fillRect(0, 0, gameBoard.width, gameBoard.height);
	gameBoardContext.strokeRect(0, 0, gameBoard.width, gameBoard.height);
};

const slither = () => {
	let newHead = { x: snake[0].x + dx, y: snake[0].y + dy };
	snake.unshift(newHead);
	snake.pop();
};

const changeDirection = (e) => {
	const LEFT_KEY = 37;
	const RIGHT_KEY = 39;
	const UP_KEY = 38;
	const DOWN_KEY = 40;
	let keyPressed = e.keycode;

	let down = dy === -10;
	let up = dy === 10;
	let right = dx === 10;
	let left = dx === -10;

	if (keyPressed === LEFT_KEY && !right) {
		dy = 0;
		dx = -10;
	}
	if (keyPressed === RIGHT_KEY && !left) {
		dy = 0;
		dx = 10;
	}
	if (keyPressed === UP_KEY && !down) {
		dy = 10;
		dx = 0;
	}
	if (keyPressed === DOWN_KEY && !up) {
		dy = -10;
		dx = 0;
	}
};

function main() {
	setInterval(() => {
		clearCanvas();
		drawSnake();
		slither();
	}, 100);
}

main();
document.addEventListener("keydown", change_direction);
