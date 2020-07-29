let gravity = 80;
let speed = 0.05;

class Character {
    /**@param {number} hue Hue color of the character */
    constructor(hue) {
        this.status;
        this.movementSpeed;
        this.x;
        this.y;
        this.present;
        this.pushdown = 5;
        this.boost = 0;
        this.hue = hue;
        this.canKeepJumping = true;

        this.mass = 0.2;
        this.velocityY = 0;
        this.forceY = this.mass * gravity;

        this.speeds = 7.5;
        this.health = 100;
        this.damage = 10;

        this.lineVectors = {};
    }

    /**@param {String} Status Character status */
    set status(Status) {
        this.status = Status
    };

    /**@param {number} x
     * @param {number} y **/
    render(x, y) {
        if (!this.present) {
            this.x = x;
            this.y = y;
            this.present = true;

            this.updateCoords(this.x, this.y);
        }
        strokeWeight(4);
        fill(this.hue ? this.hue : 0, this.hue ? 100 : 0, this.hue ? 100 : 0);
        stroke(this.hue ? this.hue : 0, this.hue ? 100 : 0, this.hue ? 100 : 0);

        ellipse(this.lineVectors.head.x, this.lineVectors.head.y, this.lineVectors.head.r); //Head
        line(this.lineVectors.leftArm.x1, this.lineVectors.leftArm.y1, this.lineVectors.leftArm.x2, this.lineVectors.leftArm.y2); //Left Arm
        line(this.lineVectors.rightArm.x1, this.lineVectors.rightArm.y1, this.lineVectors.rightArm.x2, this.lineVectors.rightArm.y2); //Right Arm
        line(this.lineVectors.body.x1, this.lineVectors.body.y1, this.lineVectors.body.x2, this.lineVectors.body.y2); //Body
        line(this.lineVectors.leftLeg.x1, this.lineVectors.leftLeg.y1, this.lineVectors.leftLeg.x2, this.lineVectors.leftLeg.y2); //Left Leg
        line(this.lineVectors.rightLeg.x1, this.lineVectors.rightLeg.y1, this.lineVectors.rightLeg.x2, this.lineVectors.rightLeg.y2); //Right Leg

        if (this.lineVectors.leftArm.x2 <= 0 || this.lineVectors.leftLeg.x2 <= 0) {
            this.x = 27;
        }

        if (this.lineVectors.rightArm.x2 >= width || this.lineVectors.rightLeg.x2 >= width) {
            this.x = width - 27;
        }
    }

    updateCoords(x, y) {
        this.lineVectors = {
            head: {
                x: x,
                y: y - 160,
                r: 40
            },
            leftArm: {
                x1: x,
                y1: y - 116.5,
                x2: x - 27,
                y2: y - 80.5
            },
            rightArm: {
                x1: x,
                y1: y - 116.5,
                x2: x + 27,
                y2: y - 80.5
            },
            body: {
                x1: x,
                y1: y - 140,
                x2: x,
                y2: y - 41.5
            },
            leftLeg: {
                x1: x,
                y1: y - 41.5,
                x2: x - 20,
                y2: y
            },
            rightLeg: {
                x1: x,
                y1: y - 41.5,
                x2: x + 20,
                y2: y
            }
        };
    }

    showHealthBar() {
        let x = this.lineVectors.head.x - this.lineVectors.head.r - this.lineVectors.head.r / 4;
        fill(100);
        strokeWeight(1);
        rect(x, this.lineVectors.head.y - 40, 100, 15);
        
        if(this.health >= 70) {
            fill(129, 88, 77);
        }
        if(this.health >= 40 && this.health < 70) {
            fill(64, 86, 100);
        }
        if(this.health >= 20 && this.health < 40) {
            fill(41, 93, 90);
        }
        if(this.health >= 1 && this.health < 20) {
            fill(0, 93, 90);
        }
        noStroke();
        rect(x, this.lineVectors.head.y - 40, this.health, 15);
    }

    physics() {
        if (this.y < height) {
            this.velocityY = this.velocityY + this.forceY * speed;
            this.y = this.y + this.velocityY * speed;
        }
        if (this.y >= height) {
            this.velocityY = 0;
            this.y = height;
            this.canKeepJumping = true;
            this.boost = 0;
        }
    }

    static Characters = [];
    static NPC = [];

    static setNPCTag() {
        for (var character in this.Characters) {
            if (character instanceof!Player) character.NPC = true, this.NPC.push(character);
        }
    }
}

class Player extends Character {
    /**@param {String} name Name of the Player */
    constructor(name, keys, hue) {
        super(hue);
        this.name = name;
        this.color;
        this.keys = keys;

        Player.Players.push(this);

        Character.setNPCTag();
        console.log(`Created Player ${this.name}`);
    }

    /**@param {number} color Changes the hue of the player */
    set color(color) {
        this.color = color
        console.log(`Set Player '${this.name}' to h(${this.color})`);
    };

    drawNameTag() {
        if (this.present) {
            noStroke();
            fill(theme == "dark" ? 'white' : 'black');
            textAlign(CENTER);
            text(this.name, this.lineVectors.head.x, this.lineVectors.head.y - 30);
        }
    }

    move() {
        if (this.present) {
            this.physics();

            if (keyIsDown(this.keys[1])) {
                this.x -= this.speeds;
                this.updateCoords(this.x, this.y);
                console.log("A pressed");
            }

            if (keyIsDown(this.keys[3])) {
                this.x += this.speeds;
                this.updateCoords(this.x, this.y);
                console.log("D Pressed");
            }
        }
    }

    jumping() {
        this.physics();
        if (keyCode == (this.keys[0]) && this.canKeepJumping) {
            this.canKeepJumping = false;
            this.y -= 75;


            console.log("W pressed");
        }

        if (keyCode == (this.keys[2])) {
            this.y += this.speeds;
            this.updateCoords(this.x, this.y);
            console.log("S pressed");
        }
    }

    punch(direction) {
        let reach = 15;
        let cooldown = 150;
        switch (direction) {
            case 'left':
                this.lineVectors.leftArm.x2 -= reach;
                this.lineVectors.leftArm.y2 = this.lineVectors.leftArm.y1;

                setTimeout(() => {
                    this.lineVectors.leftArm.x2 = this.x - 27;
                    this.lineVectors.leftArm.y2 = this.y - 80.5;
                }, cooldown);

                for (var player of Player.Players) {
                    if (player.name != this.name) {
                        let connectedWithLeftArm = collideLineLine(
                            this.lineVectors.leftArm.x1, this.lineVectors.leftArm.y1, this.lineVectors.leftArm.x2, this.lineVectors.leftArm.y2,
                            player.lineVectors.leftArm.x1, player.lineVectors.leftArm.y1, player.lineVectors.leftArm.x2, player.lineVectors.leftArm.y2 
                        );
                        let connectedWithRightArm = collideLineLine(
                            this.lineVectors.leftArm.x1, this.lineVectors.leftArm.y1, this.lineVectors.leftArm.x2, this.lineVectors.leftArm.y2,
                            player.lineVectors.rightArm.x1, player.lineVectors.rightArm.y1, player.lineVectors.rightArm.x2, player.lineVectors.rightArm.y2     
                        );
                        let connectedWithLeftLeg = collideLineLine(
                            this.lineVectors.leftArm.x1, this.lineVectors.leftArm.y1, this.lineVectors.leftArm.x2, this.lineVectors.leftArm.y2,
                            player.lineVectors.leftLeg.x1, player.lineVectors.leftLeg.y1, player.lineVectors.leftLeg.x2, player.lineVectors.leftLeg.y2 
                        );
                        let connectedWithRightLeg = collideLineLine(
                            this.lineVectors.leftArm.x1, this.lineVectors.leftArm.y1, this.lineVectors.leftArm.x2, this.lineVectors.leftArm.y2,
                            player.lineVectors.rightLeg.x1, player.lineVectors.rightLeg.y1, player.lineVectors.rightLeg.x2, player.lineVectors.rightLeg.y2     
                        );
                        let connectedWithBody = collideLineLine(
                            this.lineVectors.leftArm.x1, this.lineVectors.leftArm.y1, this.lineVectors.leftArm.x2, this.lineVectors.leftArm.y2,
                            player.lineVectors.body.x1, player.lineVectors.body.y1, player.lineVectors.body.x2, player.lineVectors.body.y2     
                        );
                        let connectedWithHead = collideLineCircle(
                            this.lineVectors.leftArm.x1, this.lineVectors.leftArm.y1, this.lineVectors.leftArm.x2, this.lineVectors.leftArm.y2,
                            player.lineVectors.head.x, player.lineVectors.head.y, player.lineVectors.head.r 
                        );

                        if(connectedWithHead) player.health -= this.damage * 2;
                        if(connectedWithBody) player.health -= this.damage * 1.25;
                        if(connectedWithLeftArm || connectedWithLeftLeg || connectedWithRightArm || connectedWithRightLeg) player.health -= this.damage;
                    }
                }

                break;
            case 'right':
                this.lineVectors.rightArm.x2 += reach;
                this.lineVectors.rightArm.y2 = this.lineVectors.rightArm.y1;

                setTimeout(() => {
                    this.lineVectors.rightArm.x2 = this.x + 27;
                    this.lineVectors.rightArm.y2 = this.y - 80.5;
                }, cooldown);
                break;
        }
    }

    /**@param {number} x The x-position of the character relative to the left leg
     * @param {number} y The y-position of the character relative to the left leg*/
    draw(x, y) {
        this.render(x, y);
        this.physics();
        this.move();
        this.showHealthBar();
        this.drawNameTag();
    }

    keyPressed() {
        this.jumping();
        switch (keyCode) {
            case this.keys[4]:
                this.punch('left');
                break;
            case this.keys[5]:
                this.punch('right');
                break;
        }
    }

    static Players = [];
}

class PhysicalObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.mass = 30;
        this.velocityY = 0;
        this.forceY = this.mass * gravity;
        this.accelerationY = this.forceY / this.mass;

        PhysicalObject.PhysicalObjects.push(this);
    }

    applyGravity() {
        this.velocityY = this.velocityY + this.accelerationY * speed;
        this.y = this.y + this.velocityY * speed;

        if (this.y >= height) {
            this.y = height;
        }
    }

    static PhysicalObjects = [];
}

class Circle extends PhysicalObject {
    constructor(x, y, widthX, widthY) {
        this.x = x;
        this.y = y;
        this.widthX = widthX;
        this.widthY = widthY;
        this.bouncingInterval;
        this.maxJumpHeight;
        super(this.x, this.y);

        ellipse(this.x, this.y, this.widthX, this.widthY ? this.widthY : this.widthX);
        Circle.Circles.push(this);
    }

    jump(duration) {
    }

    static Circles = [];
}