'use strict';

class Wave {
    constructor(key, x, y, r, g, b, t) {
        this.key = key;

        this.start_x = x;
        this.start_y = y;

        this.r = r;
        this.g = g;
        this.b = b;

        this.t = t;

        this.start_t = -1;

        this.radius = 100;
        this.opacity = 1;

        this.alive = true;

        this.easing = new CubicBezier(0.25, 0.1, 0.25, 1.0);
    }

    ripple(ts) {
        if(this.start_t === -1) this.start_t = ts;
        const elasped = ts - this.start_t;

        const progress = Math.min(elasped / this.t, 1);
        const eased_progress = this.easing.getTiming(progress);
        this.radius = eased_progress * Math.max(boundaries.width, boundaries.height) * 1.4 / 2;
        this.opacity = 1 - eased_progress;
        this.x = this.start_x + ( canvas.width / 2 - this.start_x ) * eased_progress;
        this.y = this.start_y + ( canvas.height / 2 - this.start_y ) * eased_progress;
        this.draw();
        if(progress === 1 && this.alive) this.done();
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.opacity})`;
        ctx.fill();
    }

    done() {
        this.alive = false;
        document.dispatchEvent(new CustomEvent('ripple-done', {detail: {key: this.key}}));
    }
}
