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
    angularVelocity: 0,
    angularAcceleration: 0.25,
    damping: 1,

    // Data pertaining to each arc in the circle
    arcTheta: 0,

    // State information
    spin: false,
    lock: false,
    slow: false
}

const color_data = ['#6699ff', '#ff6666', '#ffcc66', '#99ff99'];
const label_data = ['Label A', 'Label B', 'Label C', 'Label D'];

document.getElementById('spin-btn').addEventListener(
    "click", function() { 
        circle.spin = true;

        setTimeout(() => {
            circle.damping = 0.995;
        }, 5000);

        setTimeout(() => {
            circle.damping = 0.98;
        }, 8000);
        
        setTimeout(() => {
            circle.spin = false;
            clearInterval(screen.intervalHandle);
            calculate();
        }, 12500);
    }
);

function start() {
    screen.centerX = canvas.width / 2;
    screen.centerY = canvas.height / 2;

    circle.x = canvas.width / 2;
    circle.y = canvas.width / 2;
    circle.r = canvas.width / 2;
    circle.arcs = label_data.length;
    circle.arcTheta = 360 / circle.arcs;

    shuffle(label_data);
    shuffle(color_data);

    // Start game loop
    screen.intervalHandle;
}

function update() {
    if (circle.spin) {
        spinWheel();
    }
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle();
    drawButton();
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

function spinWheel() {
    circle.angle += circle.angularVelocity;
    circle.angle %= 360;

    if (!circle.lock) {
        
        circle.angularVelocity += circle.angularAcceleration;
        if (circle.angularVelocity >= 25) {
            circle.lock = true;
        }
    } else {
        circle.angularVelocity *= circle.damping;
    }
}

/**
 * Determines which arc is selected by checking whether a point on the unit circle
 * is bounded by the lower and upper bounds of an arc in degrees.
 */
function calculate() {
    const offset = 45; // Override default offset of 0 to move the selection point.

    for (let i = 0; i < circle.arcs; i++) {
        const lowerBound = ((circle.arcTheta * i));
        const upperBound = ((circle.arcTheta * (i + 1)));

        const angle = (360 + offset - circle.angle) % 360;

        if (angle > lowerBound && angle < upperBound) {
            console.log("selected:   ", label_data[i]);
            console.log("angle:      ", angle);
            console.log("lowerBound: ", lowerBound);
            console.log("upperBound: ", upperBound);
        }

    }

}

function shuffle(array) { 
    for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
    }

    return array; 
}

radians = (deg) => deg * Math.PI / 180;
degrees = (rad) => rad * 180 / Math.PI;

start();
