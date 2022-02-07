const gameBoard = document.getElementById("gameBoard");
const gameBoardContext = gameBoard.getContext("2d");

// Velocities of the snake
let dx = 10;
let dy = 0;

let changingDirection = false;

let snake = [
	{ x: 200, y: 200 },
	{ x: 190, y: 200 },
	{ x: 180, y: 200 },
	{ x: 170, y: 200 },
	{ x: 160, y: 200 },
	{ x: 150, y: 200 },
	{ x: 140, y: 200 },
];

const drawSnake = () => {
	snake.forEach((part) => {
		gameBoardContext.fillStyle = "green";
		gameBoardContext.strokeStyle = "black";
		gameBoardContext.fillRect(part.x, part.y, 10, 10);
		gameBoardContext.strokeRect(part.x, part.y, 10, 10);
	});
	// Paint head different color hehe
	gameBoardContext.fillStyle = "orange";
	gameBoardContext.strokeStyle = "black";
	gameBoardContext.fillRect(snake[0].x, snake[0].y, 10, 10);
	gameBoardContext.strokeRect(snake[0].x, snake[0].y, 10, 10);
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
	let keyPressed = e.keyCode;

	let down  =  10 === dy;
	let up    = -10 === dy;
	let right =  10 === dx;
	let left  = -10 === dx;
	if(changingDirection) return;
	changingDirection = true;

	if (keyPressed === LEFT_KEY && !right) {
		dy = 0;
		dx = -10;
	}
	if (keyPressed === RIGHT_KEY && !left) {
		dy = 0;
		dx = 10;
	}
	if (keyPressed === UP_KEY && !down) {
		dy = -10;
		dx = 0;
	}
	if (keyPressed === DOWN_KEY && !up) {
		dy = 10;
		dx = 0;
	}
};

const gameOver = () => {
	let head = {x:snake[0].x,y:snake[0].y}

	for(let i=6; i < snake.length; i++) {
		if (snake[i].x === head.x && snake[i].y === head.y) return true;
	}
	// Wall checks
	if (head.x < 0 ) {
		// Hit left wall 
		return true;
	}
	if (head.x > gameBoard.width - 10) {
		// Hit right wall
		return true;
	}
	if (head.y < 0) {
		// Hit top wall
		return true;
	}
	if (head.y > gameBoard.height - 10) {
		// Hit bottom wall
		return true;
	}

	return false;
}

const drawGameOver = () => {
	gameBoardContext.strokeStyle = "red";
	gameBoardContext.lineWidth = 7;
	gameBoardContext.strokeRect(0, 0, gameBoard.width, gameBoard.height);
}

function main() {
	setInterval(() => {
		changingDirection = false;
		if (gameOver()){
			drawGameOver();
			return;
		}
		clearCanvas();
		drawSnake();
		slither();
	}, 100);
}

document.addEventListener("keydown", changeDirection);
main();

