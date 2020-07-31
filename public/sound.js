let fft = new p5.FFT();

class Sound {
    constructor(hzLow, hzHigh) {
        this.hz = fft.getEnergy(hzLow, hzHigh);
        this.x = windowWidth/2; 
        this.y = windowHeight/2;
    }
    show() {
        fill(0, 70, 100);
        rect(this.x, this.y, 40, -this.hz);
    }
}


