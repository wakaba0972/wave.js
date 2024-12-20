const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const HEIGHT = canvas.height;
const WIDTH = canvas.width;
const ROWS = Math.floor(HEIGHT / BLOCK_SIZE);
const COLS = Math.floor(WIDTH / BLOCK_SIZE);
const REAL_RGB = RGB.map(x => x / 255);
const gl = canvas.getContext('webgl2', { premultipliedAlpha: false });

const gpu = initGPU({canvas, context: gl});
let cur_alpha = new Array(ROWS).fill().map(_ => new Float64Array(COLS).fill(0));
let nxt_alpha = new Array(ROWS).fill().map(_ => new Float64Array(COLS).fill(0));

function activation(x){
    return Math.min(1, Math.abs(1.2*x));
}

function rand_alpha(){
    for(let r = 0; r < ROWS; ++r){
        for(let c = 0; c < COLS; ++c){
            cur_alpha[r][c] = (Math.random()<0.5?-1:1)*Math.random();
        }
    }
}

function convolution(r, c){
    const rm = (!r? ROWS-1: r-1);
    const ra = (r==ROWS-1? 0: r+1);
    const cm = (!c? COLS-1: c-1);
    const ca = (c==COLS-1? 0: c+1);
    let sum = 0;

    sum += cur_alpha[rm][cm] * KERNAL[0][0];
    sum += cur_alpha[rm][c] * KERNAL[0][1];
    sum += cur_alpha[rm][ca] * KERNAL[0][2];
    sum += cur_alpha[r][cm] * KERNAL[1][0];
    sum += cur_alpha[r][c] * KERNAL[1][1];
    sum += cur_alpha[r][ca] * KERNAL[1][2];
    sum += cur_alpha[ra][cm] * KERNAL[2][0];
    sum += cur_alpha[ra][c] * KERNAL[2][1];
    sum += cur_alpha[ra][ca] * KERNAL[2][2];

    return sum;
}

function update(){
    for(let r = 0; r < ROWS; ++r){
        for(let c = 0; c < COLS; ++c){
            nxt_alpha[r][c] = activation(convolution(r, c));
        }
    }

    for(let r = 0; r < ROWS; ++r){
        for(let c = 0; c < COLS; ++c){
            cur_alpha[r][c] = nxt_alpha[r][c];
        }
    }
}

function draw(){
    const render = gpu.createKernel(function (cur_alpha, RGB) {
        this.color(
            RGB[0], 
            RGB[1], 
            RGB[2],
            cur_alpha[this.thread.y][this.thread.x]
        );
    }).setOutput([COLS, ROWS]).setGraphical(true);
    
    render(cur_alpha, RGB);
    render.destroy();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loop(){
    update();
    draw();
    await sleep(DELAY);
    requestAnimationFrame(loop);
}

function init(){
    rand_alpha();
    loop();
}

window.onload = init;