let bob;
let toggles = {};

function preload() {

}

function setup() {
    createCanvas(windowWidth, windowHeight * .8);
    colorMode(HSB, 360, 100, 100);
    bob = new Player("Bob", [87, 65, 83, 68, 81, 69], 220);
}

function draw() {
    background(80);
    bob.draw(180, height);

    toggles.theme = new Clickable();
}

function keyPressed() {

    toggles.theme.locate(20, 20);

    bob.keyPressed();
}