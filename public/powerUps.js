let powerUpActivity = false;

class Power {
    constructor() {
        this.x;
        this.y;
        this.radius = 20;
        this.diameter = this.radius*2;
        //this.yVelocity = 1;
    }
    random() {
        if(!powerUpActivity) {
            powerUpActivity = true;
            this.x = random(10, windowWidth - 50);
            this.y = -40;
        }
    }
    show() {
        if(powerUpActivity) {
            stroke(58, 100, 43);
            strokeWeight(2);
            fill(58, 58, 58);
            ellipse(this.x, this.y, this.diameter);
            stroke(0, 0, 0);
            text('speed', this.x, this.y);
            if(this.y > windowHeight * 0.88) {
                this.y = windowHeight * 0.88;
                
            }
        }
    }
    powerUpCollison() {

    }
    powerFall() {
        if(this.y < windowHeight * 0.9) {
            this.y += 3;
        }
    }
}