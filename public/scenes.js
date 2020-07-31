//SCENE ORDER
//start -> game -> gameOver
let name_input = {
    limit: 10
};
let button;
let sound;

function start() {
    this.x = windowWidth / 2;
    this.y = windowHeight / 2;
    this.color = color(5, 60, 100);
    this.enter = () => {
        background(231, 25, 18);

        //line(width / 2, 0, width / 2, height);
        fill('white');
        textSize(80);
        textAlign(RIGHT);
        text("Soul", this.x - 25, this.y - 150);
        textAlign(LEFT);
        fill(0, 70, 100);
        text("Bound", this.x - 25, this.y - 150);
        button = createButton("Play");
        button.position(this.x - 50, this.y * 1.15);
        button.style("width", "100px");
        button.style("heigth", "30px");
        button.style("border-radius", "10px");
        button.style("box-shadow", "12px, 12px");

        name_input.input = createInput();
        name_input.input.position(this.x - 75, this.y);

        name_input.input.style('background-color', this.color);
        name_input.input.style('text-align', 'CENTER');
        name_input.input.style("border-radius", "10px");
        name_input.input.style("width", "150px");
        name_input.input.style("height", "20px");

        textAlign(CENTER);
        textSize(18);
        text("Username", this.x, this.y * 0.875);

        this.draw = () => {
            sound = new Sound(20, 21);
            sound.show();
        }

        button.mousePressed(() => {
            if (name_input.input.value().length > 0) {
                if (name_input.input.value().length > 1) {
                    name_input.value = name_input.input.value();

                    button.remove();
                    name_input.input.remove();
                    this.sceneManager.showNextScene();
                } else {
                    textAlign(CENTER);
                    fill('red');
                    text("Name must be more than 1 character", windowWidth / 2, windowHeight / 2 + 60);
                }
            }
        });

    }

    this.keyPressed = () => {
        if (keyCode == ENTER && name_input.input.value().length > 0) {
            if (name_input.input.value().length > 1) {
                name_input.value = name_input.input.value();

                button.remove();
                name_input.input.remove();
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
            player = new Player(name_input.value, [87, 65, 83, 68, 81, 69], 220);
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
        let text_color = 1;
        text_color++;
        textAlign(CENTER);
        fill(text_color % 360, 100, 100);
        textSize(20);
        text(`${winner.name} WINS!`, width / 2, height / 2);
    }
}