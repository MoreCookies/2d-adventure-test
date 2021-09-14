function collisionDetection() {
  if (keyIsPressed && moving == false) {
    if (keyCode == UP_ARROW || keyCode == DOWN_ARROW || keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) {
      moving = true;
      currentDir = keyCode;
      
      if (currentDir == UP_ARROW) {
        //up
        movementBlock = new block(50, 50, (wWidth / 2), (wHeight / 2) - 50, speed, false, borderImg, "move");
        characterY += 1;
        for (var a = 0; a < blocks.length; a++) {
          //if move up, is the coords of the player the same as the block? if so, don't move.
          if (blocks[a].collidable == true) {
            if (characterX == blocks[a].coordX && characterY == blocks[a].coordY) {
              moving = false;
              characterY -= 1;
            }
          }
        }
      } else if (currentDir == DOWN_ARROW) {
        //down
        movementBlock = new block(50, 50, (wWidth / 2), (wHeight / 2) + 50, speed, false, borderImg, "move");
        characterY -= 1;
        for (var b = 0; b < blocks.length; b++) {
          if (blocks[b].collidable == true) {
            if (characterX == blocks[b].coordX && characterY == blocks[b].coordY) {
              moving = false;
              characterY += 1;
            }
          }
        }
      } else if (currentDir == LEFT_ARROW) {
        //left
        movementBlock = new block(50, 50, (wWidth / 2) - 50, (wHeight / 2), speed, false, borderImg, "move");
        characterX += 1;
        for (var c = 0; c < blocks.length; c++) {
          //if move up, is the coords of the player the same as the block? if so, don't move.
          if (blocks[c].collidable == true) {
            if (characterX == blocks[c].coordX && characterY == blocks[c].coordY) {
              moving = false;
              characterX -= 1;
            }
          }
        }
      } else if (currentDir == RIGHT_ARROW) {
        //right
        movementBlock = new block(50, 50, (wWidth / 2) + 50, (wHeight / 2), speed, false, borderImg, "move");
        characterX -= 1;
        for (var d = 0; d < blocks.length; d++) {
          //if move up, is the coords of the player the same as the block? if so, don't move.
          if (blocks[d].collidable == true) {
            if (characterX == blocks[d].coordX && characterY == blocks[d].coordY) {
              moving = false;
              characterX += 1;
            }
          }
        }
      }
    }
  }
}
//yooo poggers