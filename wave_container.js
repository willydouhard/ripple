'use strict';

class WaveContainer {
    constructor() {
        document.addEventListener('ripple-done', this.on_ripple_done.bind(this));
        this.waves = new Map();
        this.ticking = false;
    }

    push(x, y) {
        if(!this.ticking) requestAnimationFrame(this.draw.bind(this));
        this.ticking = true;
        const symb = Symbol();
        this.waves.set(symb, new Wave(symb, x, y, this.range(0, 255), this.range(0, 255), this.range(0, 255), this.range(1000, 2000)))
    }

    on_ripple_done(e) {
        this.waves.delete(e.detail.key)
        if(!this.waves.size) this.ticking = false;
    }

    range(min, max) {
      return Math.ceil(Math.random() * (max - min) + min);
    }

    draw(ts) {
        if(this.ticking) requestAnimationFrame(this.draw.bind(this));
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let wave of this.waves) {
            wave[1].ripple(ts);
        }
    }
}
