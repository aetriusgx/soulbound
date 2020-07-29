let powerUpActivity = false;
let isActive = false;

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
            strokeWeight(2);
            fill(60, 95, 100);
            ellipse(this.x, this.y, this.diameter);
            strokeWeight(2);
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
        for(var player of Player.Players) {
            let hit = player.detectCollision('circle', [this.x, this.y, this.diameter]);
            if(hit) {
                if(!isActive){
                    player.speeds = player.speeds + 5;
                    powerUpActivity = false;
                    console.log("Collide");
                    console.log(powerUpActivity.toString());
                    isActive = true;
                    setTimeout(() => {
                        console.log("PowerUp Done");
                        player.speeds = 7.5;
                        isActive = false;
                    }, 5000);
                }
            }
        }
    }
    detectPowerUp(type) {
        switch(type) 
            case
    }
}