let bob;
let theme = "light";
let toggles = {};
toggles.theme;

function preload() {

}

function setup() {
    createCanvas(windowWidth, windowHeight * .9);
    colorMode(HSB, 360, 100, 100);
    bob = new Player("Bob", [87, 65, 83, 68, 81, 69], 220);
    
    toggles.theme = new Clickable();
    toggles.theme.locate(20, 20);
    toggles.theme.strokeWeight = 0;
}

function draw() {
    if(theme == "light") background(85), toggles.theme.text = "Dark Mode", toggles.theme.color = "#EEEEEE", toggles.theme.textColor = "#000000";
    if(theme == "dark") background(0), toggles.theme.text = "Light Mode", toggles.theme.color = "#2b2b2b", toggles.theme.textColor = "#EEEEEE";
    
    toggles.theme.draw();

    bob.draw(180, height);

    themePress();
}

function keyPressed() {

    bob.keyPressed();
}

function themePress() {
    toggles.theme.onPress = () => {
        if(theme == "light") theme = "dark";
        else theme = "light";
    }
}