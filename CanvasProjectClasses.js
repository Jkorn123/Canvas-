class Obstacle {
  // Constructor takes parameters of the obstacle. This class creates a black
  // rectangle which will act as an obstacle in the game in which the player will
  // attempt to jump over. 
  constructor (x1, y1, w, h) {
    context.beginPath();
    context.rect(x1, y1, w, h);
    context.fillStyle = "#000000";
    context.fill();
  }
}
