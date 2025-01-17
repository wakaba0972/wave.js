// 畫面延遲時間(ms)
const DELAY = 10;

// 格子大小(越小解析度越高)
const BLOCK_SIZE = 3;

// 格子顏色
const RGB = [66, 179, 255];

// Kernal
/*const KERNAL = [
    [0.565, -0.716, 0.565],
    [-0.716, 0.627, -0.716],
    [0.565, -0.716, 0.565]
]*/

const KERNAL = [
    [-0.7, 0.1, 0.7, 0.1, -0.7],
    [0.1, -0.7, 0.5, -0.7, 0.1],
    [0.7, 0.5, 0.6, 0.5, 0.7],
    [0.1, -0.7,0.5, -0.7, 0.1],
    [-0.7, 0.1, 0.7, 0.1, -0.7],
]

// Activation Function
function activation(x){
    return Math.abs(0.4*x);  
}