let particles = [];

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    for (let i = 0; i < 0; i++) {
        particles.push(new Particle());
    }
  ambientLight(100);
    pointLight(255, 100, 255, width / 2, height / 50, 0);
}

function draw() {
  



    for (let particle of particles) {
        particle.update();
        particle.display();
    }

    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);

    for (let particle of particles) {
        particle.update();
        particle.display();
    }
}

function touchStarted() {
    background(random(255), random(255), random(255));
    // Add a burst of particles on mouse click
    for (let i = 0; i < 300; i++) {
        particles.push(new Particle(mouseX - width / 2, mouseY - height / 2));
      
    }
}

class Particle {
    constructor(x = random(width), y = random(height)) {
        this.position = createVector(x, y, random(-width, width));
        this.velocity = createVector(random(-1, 1), random(-1, 1), random(-1, 1));
        this.size = random(1, 1);
        this.color = color(random(255), random(255), random(255)); 
    }

    update() {
        this.position.add(this.velocity);

        if (this.position.x < -width / 2 || this.position.x > width / 2) {
            this.velocity.x *= -1;
        }

        if (this.position.y < -height / 2 || this.position.y > height / 2) {
            this.velocity.y *= -1;
        }

        if (this.position.z < -width / 2 || this.position.z > width / 2) {
            this.velocity.z *= -1;
        }
      // Update the frame counter for morphing
        this.frameCounter = (this.frameCounter + 1) % this.morphDuration;

        // Change shape based on the frame counter
        if (this.frameCounter === 0) {
            this.shape = this.shape === 'plane' ? 'sphere' : 'plane';
        }
      
    }

    display() {
        noStroke();
        fill(this.color);
        translate(this.position.x, this.position.y, this.position.z);
        rotateX(frameCount * 0.01); // Add rotation for a more 3D effect
        rotateY(frameCount * 0.01);
        plane(this.size, this.size * 1); // Use 'cone' for a
}
}