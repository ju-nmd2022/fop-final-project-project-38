const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//grid
const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 20;

canvas.width = COLS * BLOCK_SIZE;
canvas.height = ROWS * BLOCK_SIZE;

// draw the grid
ctx.strokeStyle = '#000';
ctx.lineWidth = 1;
for (let i = 0; i <= COLS; i++) {
	ctx.beginPath();
	ctx.moveTo(i * BLOCK_SIZE, 0);
	ctx.lineTo(i * BLOCK_SIZE, canvas.height);
	ctx.stroke();
}
for (let i = 0; i <= ROWS; i++) {
	ctx.beginPath();
	ctx.moveTo(0, i * BLOCK_SIZE);
	ctx.lineTo(canvas.width, i * BLOCK_SIZE);
	ctx.stroke();
}