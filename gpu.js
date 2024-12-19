function initGPU() {
	try {
		return new window.GPU.GPU();
	} catch (e) {
		return new GPU();
	}
}



/*
let k = gpu.createKernel(function (cur_alpha, kernal) {
	function activation(x){
		return Math.min(1, Math.abs(1.2*x));
	}

	let ROWS = this.output.y;
	let COLS = this.output.x;
	let r = this.thread.y;
	let c = this.thread.x;
	let sum = 0;

	sum += cur_alpha[(r - 1 + ROWS) % ROWS][(c - 1 + COLS) % COLS] * kernal[0][0];
	sum += cur_alpha[(r - 1 + ROWS) % ROWS][c] * kernal[0][1];
	sum += cur_alpha[(r - 1 + ROWS) % ROWS][(c + 1 + COLS) % COLS] * kernal[0][2];
	sum += cur_alpha[r][(c - 1 + COLS) % COLS] * kernal[1][0];
	sum += cur_alpha[r][c] * kernal[1][1];
	sum += cur_alpha[r][(c + 1 + COLS) % COLS] * kernal[1][2];
	sum += cur_alpha[(r + 1 + ROWS) % ROWS][(c - 1 + COLS) % COLS] * kernal[2][0];
	sum += cur_alpha[(r + 1 + ROWS) % ROWS][c] * kernal[2][1];
	sum += cur_alpha[(r + 1 + ROWS) % ROWS][(c + 1 + COLS) % COLS] * kernal[2][2];


	return activation(sum);
}).setOutput([COLS, ROWS]);

let render = gpu.createKernel(function (cur_alpha, rgb) {
	this.color(rgb[0], rgb[1], rgb[2], cur_alpha[this.thread.y][this.thread.x]);
}).setOutput([COLS, ROWS]).setGraphical(true);*/