let bob;
let socket;

function preload() {

}

function setup() {
    createCanvas(windowWidth, windowHeight * .8);
    colorMode(HSB, 360, 100, 100);

    socket = io.connect('http://localhost:5501');
    socket.on('key', newDrawing);

    bob = new Player("Bob", [87, 65, 83, 68, 81, 69], 220);
}
function newDrawing(data) {
    console.log("Sending Data");
}

function draw() {
    background(80);
    bob.draw(180, height);
}

function keyPressed() {
    bob.keyPressed();
}