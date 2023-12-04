const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let intervalHandle;

const wheel = {
    x: canvas.width / 4,
    y: canvas.height / 4,
    w: canvas.width / 2,
    h: canvas.height / 2
}

document.getElementById('spin-btn').addEventListener("click", function() {  } );

function start() {
    intervalHandle = setInterval(update, 20);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
}

function draw() {
    ctx.fillRect(wheel.x, wheel.y, wheel.w, wheel.h);
}

start();
