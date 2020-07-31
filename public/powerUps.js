let powerUpActivity = false;
let isActive = false;

class Power {
    constructor() {
        this.x;
        this.y;
        this.radius = 20;
        this.diameter = this.radius*2;
        this.randomPower = round(random(0, 20));
        //this.yVelocity = 1;
    }
    random() {
        if(!powerUpActivity) {
            setTimeout(() => {
                powerUpActivity = true;
                this.x = random(10, windowWidth - 50);
                this.y = -40;  
            }, 8000);
        }
    }
    show() {
        console.log(this.randomPower);
        if(powerUpActivity) {
            let type = {
                speed : 'speed',
                damage :  'damage',
                health : 'health',
                jump : 'jump'
            };

            if(this.randomPower < 5) {
                this.detectPowerUp(type.speed);
            }
            if(this.randomPower > 4 && this.randomPower < 10) {
                this.detectPowerUp(type.damage);
            }
            if(this.randomPower > 9 && this.randomPower < 15) {
                this.detectPowerUp(type.health);
            }
            if(this.randomPower > 14 && this.randomPower < 21) {
                this.detectPowerUp(type.jump);
            }

            if(this.y > windowHeight * 0.874) {
                this.y = windowHeight * 0.874;
                
            }
        }
    }
    powerFall() {
        if(this.y < windowHeight * 0.9) {
            this.y += 3;
        }
    }
    powerUpCollison() {  
        for(var player of Player.Players) {
            let hit = player.detectCollision('circle', [this.x, this.y, this.diameter]);
            if(hit && this.randomPower < 5) {
                if(!isActive){
                    player.speeds = player.speeds + 3;
                    powerUpActivity = false;
                    console.log("Speed Collided");
                    isActive = true;
                    this.randomPower = round(random(0, 20));
                    setTimeout(() => {
                        console.log("PowerUp Done");
                        player.speeds = 7.5;
                        isActive = false;
                    }, 5000);
                }
            }
            if(hit && this.randomPower > 4 && this.randomPower < 10) {
                if(!isActive){

                    powerUpActivity = false;
                    console.log("Damage Collided");
                    isActive = true;
                    this.randomPower = round(random(0, 20));
                    setTimeout(() => {
                        console.log("PowerUp Done");
                        isActive = false;
                    }, 5000);
                }
            }
            if(hit && this.randomPower > 9 && this.randomPower < 15) {
                if(!isActive){

                    powerUpActivity = false;
                    console.log("Health Collide");
                    isActive = true;
                    this.randomPower = round(random(0, 20));
                    setTimeout(() => {
                        console.log("PowerUp Done");
                        isActive = false;
                    }, 5000);
                }
            }
            if(hit && this.randomPower > 14 && this.randomPower < 21) {
                if(!isActive){
                    
                    powerUpActivity = false;
                    console.log("Jump Collide");
                    isActive = true;
                    this.randomPower = round(random(0, 20));
                    setTimeout(() => {
                        console.log("PowerUp Done");
                        isActive = false;
                    }, 5000);
                }
            }
            
        }
    }
    /**@param {String} type Type of powerup */
    detectPowerUp(type) {
        switch(type) {
            case 'speed':
                strokeWeight(2);
                fill(60, 95, 100);
                ellipse(this.x, this.y, this.diameter);
                strokeWeight(2);
                stroke(0, 0, 0);
                text('speed', this.x, this.y);
            break;
            case 'damage':
                strokeWeight(2);
                fill(0, 95, 100);
                ellipse(this.x, this.y, this.diameter);
                strokeWeight(2);
                stroke(0, 0, 0);
                text('damage', this.x, this.y);
            break;
            case 'health':
                strokeWeight(2);
                fill(122, 95, 100);
                ellipse(this.x, this.y, this.diameter);
                strokeWeight(2);
                stroke(0, 0, 0);
                text('Health', this.x, this.y);
            break;
            case 'jump':
                strokeWeight(2);
                fill(31, 95, 100);
                ellipse(this.x, this.y, this.diameter);
                strokeWeight(2);
                stroke(0, 0, 0);
                text('jump', this.x, this.y);
            break;
            default:
                return false;
        }
    }
}