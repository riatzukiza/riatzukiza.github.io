class Particle {
    constructor(x, y, r, vx, vy, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
    }
    get mass() {
        var density = 1;
        return density*Math.PI*this.r*this.r;
    }
    get v() {
        return [this.vx, this.vy];
    }
    
    dis(other) {
        var dx = this.x - other.x;
        var dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    update(canvas, particles, start) {
        for (var i = start + 1; i < particles.length; i++) {
            var other = particles[i];
            if (this.dis(other) < this.r + other.r) {
                //collison code goes here
                var res = [this.vx - other.vx, this.vy - other.vy];
                if (res[0] *(other.x - this.x) + res[1] * (other.y - this.y) >= 0 ) {
                    this.color = 'rgb(' + String(Math.floor(Math.random() * 256)) + ", " + String(Math.floor(Math.random() * 256)) + ", " + String(Math.floor(Math.random() * 256)) + ")"

                    other.color = 'rgb(' + String(Math.floor(Math.random() * 256)) + ", " + String(Math.floor(Math.random() * 256)) + ", " + String(Math.floor(Math.random() * 256)) + ")"

                    var m1 = this.mass
                    var m2 = other.mass

                    var theta = -Math.atan2(
                        other.y - this.y,
                        other.x - this.x
                    );
                    var v1 = rotate(this.v, theta);
                    var v2 = rotate(other.v, theta);
                    var u1 = rotate([v1[0] * (m1 - m2)/(m1 + m2) + v2[0] * 2 * m2/(m1 + m2), v1[1]], -theta);
                    var u2 = rotate([v2[0] * (m2 - m1)/(m1 + m2) + v1[0] * 2 * m1/(m1 + m2), v2[1]], -theta);
                    
                    this.vx = u1[0];
                    this.vy = u1[1];
                    other.vx = u2[0];
                    other.vy = u2[1];
                }
            }
        }
        if (this.x - this.r <= 0) {
            this.x = this.r;
        } 
        if (this.x + this.r >= canvas.width) {
            this.x = canvas.width - this.r;
        }
        if ((this.x - this.r <= 0 && this.vx < 0) || (this.x + this.r >= canvas.width && this.vx > 0)) {
            this.vx = -this.vx;
        }
        if (this.y - this.r <= 0) {
            this.y = this.r;
        }
        if (this.y + this.r >= canvas.height) {
            this.y = canvas.height - this.r;
        }
        if ((this.y - this.r <= 0 && this.vy < 0) || (this.y + this.r >= canvas.height && this.vy > 0)) {
            this.vy = -this.vy;
        }
        this.x += this.vx
        this.y += this.vy
    }
    
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill()
        ctx.stroke();
    }
}

function rotate(v, theta) {
    return [v[0] * Math.cos(theta) - v[1] * Math.sin(theta), 
             wmv[0] * Math.sin(theta) + v[1] * Math.cos(theta)];
}


function mainLoop(particles, canvas, ctx) {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    for (i = 0 ; i < particles.length; i++) {
        particles[i].update(canvas, particles.slice(0), i);
        particles[i].draw(ctx);
    }
    window.requestAnimationFrame(function() {
        mainLoop(particles, canvas, ctx);
    });
}
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var num = 150;
var particles = [];
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
for (var i = 1; i <= num; i++) {
    var min = Math.min(canvas.height, canvas.width);
    var vx = Math.floor((0.5 - Math.random()) * min/100);
    var vy = Math.floor((0.5 - Math.random()) * min/100);
    var ok = false;
    while (!ok) {
        var minr = min/80
        var maxr = min/40
        var r = Math.floor(Math.random() * (maxr - minr)) + minr;
        var x = Math.floor(Math.random() * (canvas.width-2*r)) + r;
        var y = Math.floor(Math.random() * (canvas.height-2*r)) + r;
        
        var color = 'rgb(' + String(Math.floor(Math.random() * 256)) + ", " + String(Math.floor(Math.random() * 256)) + ", " + String(Math.floor(Math.random() * 256)) + ")"
        var particle = new Particle(x, y, r, vx, vy, color);
        
        ok = true;
        for (var j = 0; j < particles.length; j++) {
            if (particles[j].dis(particle) < particle.r + particles[j].r) ok = false;
        }
    }
    particles.push(particle);
}
mainLoop(particles, canvas, ctx);


