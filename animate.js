/**
 *  handleShipAnimation moves the ship based on its direction and
 *    keyboard control
 *
 */
function handleShipAnimation() {
  if (CONTROLS.ship.forward) {
    var radians = (Math.PI / 180) * SPACE_SHIP.rotation,
        cos = Math.cos(radians),
        sin = Math.sin(radians);
    SPACE_SHIP.x += SPACE_SHIP.speed * sin;
    SPACE_SHIP.y +=  SPACE_SHIP.speed * cos;
  }
  if (CONTROLS.ship.backward) {
    var radians = (Math.PI / 180) * SPACE_SHIP.rotation,
        cos = Math.cos(radians),
        sin = Math.sin(radians);
    SPACE_SHIP.x -= SPACE_SHIP.speed * sin;
    SPACE_SHIP.y -=  SPACE_SHIP.speed * cos;
  }
  if (CONTROLS.ship.rotateClockwise) {
    SPACE_SHIP.rotation -= 4;
  }
  if (CONTROLS.ship.rotateCounterClockwise) {
    SPACE_SHIP.rotation += 4;
  }

  // Check if asteroid is leaving the boundary, if so, switch sides
  if (SPACE_SHIP.x > GAME.canvas.width) {
    SPACE_SHIP.x = 0;
  } else if (SPACE_SHIP.x < 0) {
    SPACE_SHIP.x = 600;
  } else if (SPACE_SHIP.y > GAME.canvas.height) {
    SPACE_SHIP.y = 0;
  } else if (SPACE_SHIP.y < 0) {
    SPACE_SHIP.y = 300;
  }
}
function RenderNewObject(context) {
//  var canvas = document.getElementById('canvas');
  // Draw a new item here using the canvas 'context' variable
  context.fillStyle = 'rgb(200,0,0)';
  context.fillRect(PAB_OBJECT.x, PAB_OBJECT.y, 100, 100);


}

function HandleNewObjectMovement() {

  if (PAB_OBJECT.x >= 500 || PAB_OBJECT.y >= 200)
  {
    PAB_OBJECT.x -= 2.5;
    PAB_OBJECT.y -= 1;
    forward = false;
  }
  else if (PAB_OBJECT.x == 0 || PAB_OBJECT.y == 0)
  {
    PAB_OBJECT.x += 2.5;
    PAB_OBJECT.y += 1;
    forward = true;
  }
  else if (forward == false) {
    PAB_OBJECT.x -= 2.5;
    PAB_OBJECT.y -= 1;
    forward = false;
  }
  else if (forward == true){
    PAB_OBJECT.x += 2.5;
    PAB_OBJECT.y += 1;
    forward = true;
  }
}

function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  if (GAME.started) {

    // 1 - Reposition the objects
    handleShipAnimation();
    HandleNewObjectMovement();

    // 2 - Clear the CANVAS
    context.clearRect(0, 0, 600, 300);

    // 3 - Draw new items
    RenderSpaceship(context);
    RenderNewObject(context);

  } else {
    context.font = "30px Arial";
    context.fillText("Game Over      Level " + GAME.level, 135, 200);
  }
  window.requestAnimationFrame(runGame);
}

window.requestAnimationFrame(runGame);