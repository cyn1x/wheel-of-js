const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const screen = {
    intervalHandle: setInterval(update, 20),
    centerX: 0,
    centerY: 0,
}

const rectangle = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    quadrants: 4,

    // Data pertaining to each quadrant
    quadWidth: 0,
    quadHeight: 0
}

const circle = {
    x: 0,
    y: 0,
    r: 0,
    d: 0,
    c: 0,
    slices: 0,

    // Data pertaining to each slice in the circle
    theta: 0,
    area: 0,
    arcLength: 0,
}

let color_data = ['#6699ff', '#ff6666', '#ffcc66', '#99ff99'];
let label_data = ['Test 1', 'Test 2', 'Test 3', 'Test 4'];

document.getElementById('spin-btn').addEventListener("click", undefined);

function start() {
    screen.centerX = canvas.width / 2;
    screen.centerY = canvas.height / 2;

    circle.x = canvas.width / 2;
    circle.y = canvas.width / 2;
    circle.r = canvas.width / 2;
    circle.d = 2 * circle.r;
    circle.c = 2 * Math.PI * circle.r;
    circle.slices = label_data.length;
    circle.theta = 360 / circle.slices;
    circle.area = (circle.sliceTheta / 360) * Math.PI * Math.pow(circle.r, 2);
    circle.arcLength = (circle.sliceTheta / 360) * 2 * Math.PI * circle.r;
    
    // Start game loop
    screen.intervalHandle;
}

function update() {
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drawQuad();
    drawCircle();
    drawButton();
    // clearInterval(screen.intervalHandle);
}

function drawQuad() {
    for (let i = 0; i < 4; i++) {
    }
}

function drawCircle() {
    for (let i = 0; i < circle.slices; i++) {
        const start = radians(circle.theta * i);
        const end = radians((circle.theta * i) + circle.theta);

        ctx.beginPath();
        ctx.moveTo(screen.centerX, screen.centerY);
        ctx.arc(circle.x, circle.y, circle.r, start, end);
        ctx.lineTo(screen.centerX, screen.centerY);
        ctx.fillStyle = color_data[i];
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#fff";
        ctx.fill();
        ctx.stroke();
    }
}

function drawButton() {
}

function drawText() {
}

radians = (degrees) => degrees * Math.PI / 180

start();
