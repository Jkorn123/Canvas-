class Obstacle {
  // Constructor takes parameters of the obstacle. This class creates a black
  // rectangle which will act as an obstacle in the game in which the player will
  // attempt to jump over.
  constructor (x1, y1, w, h) {
    this.x = x1;
    this.y = y1;
    this.width = w;
    this.height = h;
    this.color = "#000000";
    this.x_velocity = -1;
  }

  draw() {
    //Draws the Obstacle.
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = this.color;
    context.fill();
  }

  moveObstacle() {
    // Applies the velocity to the x coordinate of the obstacle
    this.x += this.x_velocity;
  }
}
