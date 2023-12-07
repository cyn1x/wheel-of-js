const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const screen = {
    intervalHandle: setInterval(update, 20),
    centerX: 0,
    centerY: 0,
}

const circle = {
    x: 0,
    y: 0,
    r: 0,
    angle: 0,
    arcs: 0,

    // Data pertaining to each arc in the circle
    arcTheta: 0
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
    circle.arcs = label_data.length;
    circle.arcTheta = 360 / circle.arcs;
    
    // Start game loop
    screen.intervalHandle;
}

function update() {
    draw();
    // circle.angle += 1;
    // circle.angle %= 360;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle();
    drawButton();
    // clearInterval(screen.intervalHandle);
}

function drawCircle() {
    for (let i = 0; i < circle.arcs; i++) {
        const index = i;
        const start = radians(circle.arcTheta * i);
        const end = radians((circle.arcTheta * i) + circle.arcTheta);
        
        ctx.save();
        ctx.translate(circle.x, circle.y);
        ctx.rotate(radians(circle.angle));
        ctx.translate(-circle.x, -circle.y);

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

        ctx.restore();
        drawLabels(index);
    }
}

function drawButton() {
}

function drawLabels(index) {
    ctx.save();
    ctx.translate(circle.x, circle.y);
    ctx.rotate(radians(circle.angle + circle.arcTheta / 2 + circle.arcTheta * index));
    ctx.font = "1rem sans-serif";
    ctx.fillText(label_data[index], screen.centerX / 4, 5);
    ctx.translate(-circle.x, -circle.y);
    ctx.restore();
}

radians = (deg) => deg * Math.PI / 180;
degrees = (rad) => rad * 180 / Math.PI;

start();
