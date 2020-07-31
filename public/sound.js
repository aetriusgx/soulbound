let ftt = new p5.FFT();

class Sound {
    constructor(hzLow, hzHigh) {
        this.hz = fft.getEnergy(hzLow, hzHigh);
        this.x = windowWidth * 0.5; 
        this.y = windowheight * 0.9;
    }
    show() {
        fill(0, 70, 100);
        rect(this.x, this.y, 20, 20);
    
    }
}


