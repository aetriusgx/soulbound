let player;
let player2;
// startGame;
let power;
let theme = "light";
let toggles = {};
let Player_Initiated = false;
let socket;
toggles.theme;

function preload() {

}

function setup() {
    createCanvas(windowWidth, windowHeight * .9);
    colorMode(HSB, 360, 100, 100);

    if (!Player_Initiated) {
        //let name = prompt("What would you like your name to be?");

        player = new Player("name", [87, 65, 83, 68, 81, 69], 220);
        player2 = new Player("other", [104, 100, 101, 102, 103, 105], 10);
        Player_Initiated = true;
    }

    toggles.theme = new Clickable();
    toggles.theme.locate(20, 20);
    toggles.theme.strokeWeight = 0;

    socket = io.connect("http://localhost:5500/");
    socket.on('key', (data) => {
        console.log("sending data");
    })

    power = new Power();
    //startGame = new StartScene();
}

function draw() {
    if (theme == "light") background(85), toggles.theme.text = "Dark Mode", toggles.theme.color = "#EEEEEE", toggles.theme.textColor = "#000000";
    if (theme == "dark") background(0), toggles.theme.text = "Light Mode", toggles.theme.color = "#2b2b2b", toggles.theme.textColor = "#EEEEEE";

    toggles.theme.draw();

    if (Player_Initiated) player.draw(180, height), player2.draw(240, height);

    themePress();
    power.random();
    power.show();
    power.powerFall();
    power.powerUpCollison();
    //startGame.playButton();
}

function keyPressed() {

    player.keyPressed();
    player2.keyPressed();
}

function themePress() {
    toggles.theme.onPress = () => {
        if (theme == "light") theme = "dark";
        else theme = "light";
    }
}