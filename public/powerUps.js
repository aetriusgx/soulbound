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
            fill(60, 95, 100);
            ellipse(this.x, this.y, this.diameter);
            strokeWeight(2.5);
            stroke(0, 0, 0);
            text('speed', this.x, this.y);
            if(this.y > windowHeight * 0.895) {
                this.y = windowHeight * 0.895;
                
            }
        }
    }
    powerFall() {
        if(this.y < windowHeight * 0.9) {
            this.y += 3;
        }
    }
    powerUpCollison() {
        player.
    }
}