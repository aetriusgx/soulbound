//SCENE ORDER
//start -> game -> gameOver
let name_input = {
    limit: 10
};

let buttons = {

};

let sliders = {

};

let model_hues = {

};

let switches = {

};

let texts = {
    one: {},
    two: {}
};

let sound;
let mode = 'single';

function start() {

    this.x = windowWidth / 2;
    this.y = windowHeight / 2;
    this.color = color(5, 60, 100);
    this.enter = () => {
        background(231, 25, 18);
        //line(width / 2, 0, width / 2, height);


        buttons.one = createButton("Play");
        buttons.one.position(this.x - 50, this.y * 1.15);
        buttons.one.style("width", "100px");
        buttons.one.style("heigth", "30px");
        buttons.one.style("border-radius", "10px");
        buttons.one.style("box-shadow", "12px", "12px");

        name_input.one = createInput();

        name_input.one.style('background-color', this.color);
        name_input.one.style('text-align', 'CENTER');
        name_input.one.style("border-radius", "10px");
        name_input.one.style("width", "150px");
        name_input.one.style("height", "20px");

        sliders.one = createSlider(0, 360, 220);
        sliders.one.style('width', "150px");

        name_input.two = createInput();

        switches.mode = createCheckbox();
        switches.mode.position(this.x + 80, this.y);
    }

    this.draw = () => {
        background(231, 25, 18);
        switches.mode.changed(() => {
            if (mode == 'single') mode = 'double', console.log(mode);
            else if (mode == 'double') mode = 'single', console.log(mode);
        });
        noStroke();

        fill('white');
        textSize(80);
        textAlign(RIGHT);
        text("Soul", this.x - 25, this.y - 150);
        textAlign(LEFT);
        fill(0, 70, 100);
        text("Bound", this.x - 25, this.y - 150);

        textAlign(CENTER);
        textSize(18);
        fill('white');
        text("Player One", texts.one.x, texts.one.y);

        if (mode == 'single') {

            texts.one.x = this.x, texts.one.y = this.y * 0.875;
            name_input.two.hide();
            name_input.one.position(this.x - 75, this.y);
            sliders.one.position(windowWidth * 0.9 - 75, windowHeight * 0.6);

            noStroke();
            textSize(14);
            textAlign(CENTER);
            text("Player One", windowWidth * 0.9, windowHeight * 0.55);

            buttons.one.mousePressed(() => {
                if (name_input.one.value().length > 0) {
                    if (name_input.one.value().length > 1) {
                        name_input.value = name_input.one.value();

                        model_hues.one = slider.value();
                        button.remove();
                        name_input.one.remove();
                        sliders.one.remove();
                        this.sceneManager.showNextScene();
                    } else {
                        textAlign(CENTER);
                        fill('red');
                        text("Name must be more than 1 character", windowWidth / 2, windowHeight / 2 + 60);
                    }
                }
            });

            model_hues.one = sliders.one.value();
            let characterOne = new Character(model_hues.one);
            characterOne.render(windowWidth * 0.9, windowHeight * 0.5);
        }

        if (mode == 'double') {
            texts.one.x = this.x - 225, texts.one.y = this.y * 0.875;
            texts.two.x = this.x + 225, texts.two.y = this.y * 0.875;

            textAlign(CENTER);
            textSize(18);
            fill('white');
            text("Player Two", texts.two.x, texts.two.y);
            
            name_input.one.position(this.x - 300, this.y);

            name_input.two.show();
            name_input.two.position(this.x + 150, this.y);
            name_input.two.style('border-radius', '12px');
            name_input.two.style('width', '150px');
            name_input.two.style('height', '20px');

            sliders.one.position(windowWidth * 0.1 - 75, windowHeight * 0.6);
        }

        // sound = new Sound(13561, 380);
        // sound.show();
    }

    this.keyPressed = () => {
        if (keyCode == ENTER && name_input.one.value().length > 0) {
            if (name_input.one.value().length > 1) {
                name_input.value = name_input.one.value();

                model_hues.one = sliders.one.value();
                buttons.one.remove();
                name_input.one.remove();
                sliders.one.remove();
                name_input.two.remove();
                switches.mode.remove();
                this.sceneManager.showNextScene();
            } else {
                textAlign(CENTER);
                fill('red');
                text("Name must be more than 1 character", windowWidth / 2, windowHeight / 2 + 60);
            }
        }
    }
}

function game() {
    let player;
    let player2;
    let Player_Initiated = false;
    let power;
    this.setup = () => {
        if (!Player_Initiated) {
            player = new Player(name_input.one.value(), [87, 65, 83, 68, 81, 69], model_hues.one);
            player2 = new Player("other", [104, 100, 101, 102, 103, 105], 10);
            Player_Initiated = true;
            power = new Power();
        }
    }

    this.draw = () => {
        image(images.game_background, 0, 0, width, height);
        if (Player_Initiated) player.draw(180, height), player2.draw(1240, height);


        power.random();
        power.show();
        power.powerFall();
        power.powerUpCollison();

        if (player.health <= 0 || player2.health <= 0) {
            if (player.health <= 0) winner = player2;
            if (player2.health <= 0) winner = player;
            this.sceneManager.showNextScene();
        }
    }

    this.keyPressed = () => {
        player.keyPressed();
        player2.keyPressed();
    }
}


function gameOver() {
    this.setup = () => {

    }

    this.draw = () => {
        background(231, 25, 18);
        image(images.game_background, 0, 0, width, height);
        let text_color = 1;
        textAlign(CENTER);
        fill(text_color % 360, 100, 100);
        text_color++;
        textSize(20);
        text(`${winner.name} WINS!`, width / 2, height / 2);
    }
}