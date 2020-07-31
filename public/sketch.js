let toggles = {};
let images = {};    
let socket;
let backgroundImage;
let sceneManager;
let winner;



function preload() {
    images.game_background = loadImage("../assets/images/background.jpg");
    soundTrack = loadSound("../assets/sounds/action_crave.mp3");
}

function setup() {
    createCanvas(windowWidth, windowHeight * .9);
    colorMode(HSB, 360, 100, 100);
    socket = io.connect("http://localhost:5500/");
    socket.on('key', (data) => {
        console.log("sending data");
    });
    soundTrack.play();
    soundTrack.loop();
    

    sceneManager = new SceneManager();
    sceneManager.addScene(start);
    sceneManager.addScene(game);
    sceneManager.addScene(gameOver);
    
    sceneManager.showNextScene();
}    

function draw() {
    sceneManager.draw();
}

function keyPressed() {
    sceneManager.handleEvent('keyPressed');
}

function mousePressed() {
    sceneManager.handleEvent('mousePressed');
}