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
let col = {
    w: 70,
    ws: 0,
    a: 70,
    as: 0,
    s: 70,
    ss: 0,
    d: 70,
    ds: 0,
    q: 70,
    qs: 0,
    e: 70,
    es: 0,
    up: 70,
    upSat: 0,
    left: 70,
    leftSat: 0,
    down: 70,
    downSat: 0,
    right: 70,
    rightSat: 0,
    n: 70,
    ns: 0,
    m: 70,
    ms: 0
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
        sliders.one.style('width', '150px');

        name_input.two = createInput();
        name_input.two.style('text-align', 'CENTER');
        name_input.two.style('border-radius', '12px');
        name_input.two.style('width', '150px');
        name_input.two.style('height', '20px');

        sliders.two = createSlider(0, 360, 120);
        sliders.two.style('width', '150px');

        switches.mode = createCheckbox();
        switches.mode.position(this.x + 80, this.y);
    }
    this.setup = () => {
        colorMode(HSB, 360, 100, 100);
    }
    this.draw = () => {
        background(231, 25, 18);

        let characterOne = new Character(model_hues.one);

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
            name_input.two.hide();
            sliders.two.hide();

            texts.one.x = this.x, texts.one.y = this.y * 0.875;
            name_input.one.position(this.x - 75, this.y);
            sliders.one.position(windowWidth * 0.9 - 75, windowHeight * 0.6);
            // fill(0);
            // text("W", this.x + 400, this.y - 400, 40, 40);
            // text("A", this.x + 360, this.y - 360, 40, 40);
            // text("S", this.x + 400, this.y - 360, 40, 40);
            // text("D", this.x + 440, this.y - 300, 40, 40);
            // text("Q", this.x + 400, this.y - 200, 40, 40)
            // text("E", this.x + 400, this.y - 200, 40, 40)
            //let color = color(70);
            stroke(0);
            strokeWeight(2);

            fill(0, col.ws, col.w);
            rect(this.x + 540, this.y - 400, 40, 40, 5);

            fill(0, col.as, col.a);
            rect(this.x + 500, this.y - 360, 40, 40, 5);

            fill(0, col.ss, col.s);
            rect(this.x + 540, this.y - 360, 40, 40, 5);

            fill(0, col.ds, col.d);
            rect(this.x + 580, this.y - 360, 40, 40, 5);

            fill(0, col.qs, col.q);
            rect(this.x + 630, this.y - 400, 40, 40, 5);

            fill(0, col.es, col.e);
            rect(this.x + 630, this.y - 360, 40, 40, 5);

            fill(100);
            text("W", this.x + 560, this.y - 373);
            text("A", this.x + 520, this.y - 335);
            text("S", this.x + 560, this.y - 335);
            text("D", this.x + 600, this.y - 335);
            text("Q", this.x + 650, this.y - 380);
            text("E", this.x + 650, this.y - 340);
            
            text("Move", this.x + 560, this.y - 420);
            text("Punch", this.x + 650, this.y - 420);

            noStroke();
            textAlign(CENTER);
            text("Player One", windowWidth * 0.9, windowHeight * 0.535);


            buttons.one.mousePressed(() => {
                if (name_input.one.value().length > 0) {
                    if (name_input.one.value().length > 1) {
                        name_input.value = name_input.one.value();

                        model_hues.one = slider.value();
                        button.remove();
                        name_input.one.remove();
                        name_input.two.remove();
                        sliders.one.remove();
                        sliders.two.remove();
                        this.sceneManager.showNextScene();
                    } else {
                        textAlign(CENTER);
                        fill('red');
                        text("Name must be more than 1 character", windowWidth / 2, windowHeight / 2 + 60);
                    }
                }
            });

            model_hues.one = sliders.one.value();
            characterOne.render(windowWidth * 0.9, windowHeight * 0.5);
        }

        if (mode == 'double') {
            let characterTwo = new Character(model_hues.two);

            texts.one.x = this.x - 225, texts.one.y = this.y * 0.875;
            texts.two.x = this.x + 225, texts.two.y = this.y * 0.875;
            name_input.two.show();
            sliders.two.show();

            textAlign(CENTER);
            textSize(18);
            fill('white');
            text("Player Two", texts.two.x, texts.two.y);

            name_input.one.position(this.x - 300, this.y);

            name_input.two.position(this.x + 150, this.y);

            sliders.one.position(windowWidth * 0.1 - 75, windowHeight * 0.6);

            sliders.two.position(windowWidth * 0.9 - 75, windowHeight * 0.6);

            textAlign(CENTER);
            text("Player One", windowWidth * 0.1, windowHeight * 0.535);

            textAlign(CENTER);
            text("Player Two", windowWidth * 0.9, windowHeight * 0.535);

            model_hues.one = sliders.one.value();
            model_hues.two = sliders.two.value();
            characterOne.render(windowWidth * 0.1, windowHeight * 0.5);
            characterTwo.render(windowWidth * 0.9, windowHeight * 0.5);

            stroke(0);
            strokeWeight(2);

            fill(0, col.ws, col.w);
            rect(this.x - 580, this.y - 400, 40, 40, 5);

            fill(0, col.as, col.a);
            rect(this.x - 620, this.y - 360, 40, 40, 5);

            fill(0, col.ss, col.s);
            rect(this.x - 580, this.y - 360, 40, 40, 5);

            fill(0, col.ds, col.d);
            rect(this.x - 540, this.y - 360, 40, 40, 5);

            fill(0, col.qs, col.q);
            rect(this.x - 650, this.y - 400, 40, 40, 5);

            fill(0, col.es, col.e);
            rect(this.x - 650, this.y - 360, 40, 40, 5);

            fill(100);
            text("W", this.x + 560, this.y - 373);
            text("A", this.x + 520, this.y - 335);
            text("S", this.x + 560, this.y - 335);
            text("D", this.x + 600, this.y - 335);
            text("Q", this.x + 650, this.y - 380);
            text("E", this.x + 650, this.y - 340);
            
            text("Move", this.x + 560, this.y - 420);
            text("Punch", this.x + 650, this.y - 420);
        }

        // sound = new Sound(13561, 380);
        // sound.show();
    }

    this.keyPressed = () => {
        if (keyCode == ENTER) {
            if(mode == 'single') {
                if (name_input.one.value().length > 1) {
    
                    model_hues.one = sliders.one.value();
                    buttons.one.remove();
                    name_input.one.remove();
                    sliders.one.remove();
                    sliders.two.remove();
                    name_input.two.remove();
                    switches.mode.remove();
                    this.sceneManager.showNextScene();
                } else {
                    textAlign(CENTER);
                    fill('red');
                    text("Name must be more than 1 character", windowWidth / 2, windowHeight / 2 + 60);
                }
            }
            else if(mode == 'double') {
                if (name_input.one.value().length > 1 && name_input.two.value().length > 1) {
    
                    model_hues.one = sliders.one.value();
                    buttons.one.remove();
                    name_input.one.remove();
                    sliders.one.remove();
                    sliders.two.remove();
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
        if (keyCode == 87) {
            col.w = 100
            col.ws = 70;
            setTimeout(() => {
                col.w = 70;
                col.ws = 0;
            }, 200);
        }
        if (keyCode == 65) {
            col.a = 100
            col.as = 70;
            setTimeout(() => {
                col.a = 70;
                col.as = 0;
            }, 200);
        }
        if (keyCode == 83) {
            col.s = 100
            col.ss = 70;
            setTimeout(() => {
                col.s = 70;
                col.ss = 0;
            }, 200);
        }
        if (keyCode == 68) {
            col.d = 100
            col.ds = 70;
            setTimeout(() => {
                col.d = 70;
                col.ds = 0;
            }, 200);
        }
        if (keyCode == 81) {
            col.q = 100
            col.qs = 70;
            setTimeout(() => {
                col.q = 70;
                col.qs = 0;
            }, 200);
        }
        if (keyCode == 69) {
            col.e = 100
            col.es = 70;
            setTimeout(() => {
                col.e = 70;
                col.es = 0;
            }, 200);
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

            if (mode == 'double') {
                player2 = new Player(name_input.two.value(), [38, 37, 40, 39, 78, 77], model_hues.two);
            }

            Player_Initiated = true;
            power = new Power();
        }
    }

    this.draw = () => {
        image(images.game_background, 0, 0, width, height);
        if (Player_Initiated) {
            player.draw(180, height);
            if (mode == 'double') {
                player2.draw(1240, height);
            }

        };


        power.random();
        power.show();
        power.powerFall();
        power.powerUpCollison();
        if (mode == 'double') {
            if (player.health <= 0 || player2.health <= 0) {
                if (player.health <= 0) winner = player2;
                if (player2.health <= 0) winner = player;
                this.sceneManager.showNextScene();
            }
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
    this.keyPressed = () => {
        this.sceneManager.showNextScene();
    }
}