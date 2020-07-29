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

            this.lineVectors = {
                head: {
                    x: this.x, y: this.y - 160, r: 40
                },
                leftArm: {
                    x1: this.x, y1: this.y - 116.5, x2: this.x - 27, y2: this.y - 80.5
                },
                rightArm: {
                    x1: this.x, y1: this.y - 116.5, x2: this.x + 27, y2: this.y - 80.5
                },
                body: {
                    x1: this.x, y1: this.y - 140, x2: this.x, y2: this.y - 41.5
                },
                leftLeg: {
                    x1: this.x, y1: this.y - 41.5, x2: this.x - 20, y2: this.y
                },
                rightLeg: {
                    x1: this.x, y1: this.y - 41.5, x2: this.x + 20, y2: this.y
                }
            };
        }
        strokeWeight(4);
        fill(this.hue ? this.hue : 0, this.hue ? 100 : 0, this.hue ? 100 : 0);
        stroke(this.hue ? this.hue : 0, this.hue ? 100 : 0, this.hue ? 100 : 0);

        

        ellipse(this.lineVectors.head.x, this.lineVectors.head.y, this.lineVectors.head.r);                          //Head
        line(this.lineVectors.leftArm.x1, this.lineVectors.leftArm.y1, this.lineVectors.leftArm.x2, this.lineVectors.leftArm.y2);    //Left Arm
        line(this.lineVectors.rightArm.x1, this.lineVectors.rightArm.y1, this.lineVectors.rightArm.x2, this.lineVectors.rightArm.y2);   //Right Arm
        line(this.lineVectors.body.x1, this.lineVectors.body.y1, this.lineVectors.body.x2, this.lineVectors.body.y2);          //Body
        line(this.lineVectors.leftLeg.x1, this.lineVectors.leftLeg.y1, this.lineVectors.leftLeg.x2, this.lineVectors.leftLeg.y2);            //Left Leg
        line(this.lineVectors.rightLeg.x1, this.lineVectors.rightLeg.y1, this.lineVectors.rightLeg.x2, this.lineVectors.rightLeg.y2);           //Right Leg

    }

    updateCoords(x, y) {
        this.lineVectors = {
            head: {
                x: x, y: y - 160, r: 40
            },
            leftArm: {
                x1: x, y1: y - 116.5, x2: x - 27, y2: y - 80.5
            },
            rightArm: {
                x1: x, y1: y - 116.5, x2: x + 27, y2: y - 80.5
            },
            body: {
                x1: x, y1: y - 140, x2: x, y2: y - 41.5
            },
            leftLeg: {
                x1: x, y1: y - 41.5, x2: x - 20, y2: y
            },
            rightLeg: {
                x1: x, y1: y - 41.5, x2: x + 20, y2: y
            }
        };
    }

    /**@param {number} boost The height boost of the jump
     * @param {number} direction the x-direction of the jump */
    jump(boost, direction) {
        
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
        let size = this.name.length;
        if(this.present) {
            
        }
    }

    move() { //WASD
        if (this.present) {
            this.physics();
            
            if (keyIsDown(this.keys[1])) {
                this.x -= 5;
                this.updateCoords(this.x, this.y);
                console.log("A pressed");
            }
            
            if (keyIsDown(this.keys[3])) {
                this.x += 5;
                this.updateCoords(this.x, this.y);
                console.log("D Pressed");
            }
        }
    }

    jumping() {
        if (keyCode == (this.keys[0]) && this.canKeepJumping) {
            this.canKeepJumping = false;
            

            console.log("W pressed");
        }

        if (keyCode == (this.keys[2])) {
            this.y += 5;
            this.updateCoords(this.x, this.y);
            console.log("S pressed");
        }
    }

    punch(direction) {
        let reach = 15;
        let cooldown = 150;
        switch(direction) {
            case 'left':
                this.lineVectors.leftArm.x2 -= reach;
                this.lineVectors.leftArm.y2 = this.lineVectors.leftArm.y1;

                setTimeout( () => {
                    this.lineVectors.leftArm.x2 = this.x - 27;
                    this.lineVectors.leftArm.y2 = this.y - 80.5;
                }, cooldown);

                break;
            case 'right':
                this.lineVectors.rightArm.x2 += reach;
                this.lineVectors.rightArm.y2 = this.lineVectors.rightArm.y1;

                setTimeout( () => {
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
    }

    keyPressed() {
        this.jumping();
        switch(keyCode) {
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
        
        if(this.y >= height) {
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

        ellipse(this.x, this.y, this.x, this.y ? this.y : this.x);
        Circle.Circles.push(this);
    }

    jump(duration) {
        //Note: falls 20 pixels per frame
        if (this.falling && this.y >= height) {
            if (!this.maxJumpHeight) this.maxJumpHeight = this.y - (this.fallVelocity * 10);

            if (this.maxJumpHeight != 0) {
                this.canApplyGravity = false;
                this.y += this.fallVelocity / 2;
            }
        }
    }

    static Circles = [];
}