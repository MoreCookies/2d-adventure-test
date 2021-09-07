var characterX = 0;
var characterY = 0;
var wWidth = 500;
var wHeight = 500;
var fr = 30;
var moving = false;
let fCount = 0;
var currentDir = null;
let speed = 5;
var colliding = false;
var blocks = [];
var blockPriority = {"grass":1, "rock":3, "water":0, "berry":2};
var health = 100;
var maxHealth = 100;


function preload() {
	character = loadImage("character.png")
	grassImg = loadImage("blocks/Grass.png")
	waterImg = loadImage("blocks/Water.png")
  rockImg = loadImage("blocks/ronk.png")
	borderImg = loadImage("Border.png")
	berryImg = loadImage("berry-bush.png")
}

function setup() {
	createCanvas(wWidth, wHeight);
  
  for(var x = 0; x < 15; x++) {
    for(var y = 0; y < 15; y++) {
      blocks.push(new block(50, 50, x*50, y*50, speed, false, grassImg, "grass"));
    }
  }
  for(var x = 0; x < 3; x++) {
    for(var y = 0; y < 3; y++) {
      blocks.push(new block(50, 50, x*50, y*50, speed, true, rockImg, "rock"));
    }
  }
  for(var x = -15; x < 30; x++) {
    for(var y = -25; y < 30; y++) {
      blocks.push(new block(50, 50, x*50, y*50, speed, true, waterImg, "water"));
    }
  }

	for(var x = 0; x < 0; x++) {
  for(var y = 0; y < 0; y++) {
      blocks.push(new block(50, 50, x*50, y*50, speed, false, berryImg, "berry"));
    }
  }
  
  // TARGET SPOTTED, WATER DELETING DOESNT WORK PROPERLY
  // SOLUTION INSTEAD OF LIKE BURNING YOUR COMPUTER MAKE WATER WITH THE GRASS FOR LESS SADNESS AND STUFF HOWEVER WILL MAKE IT A LOT LESS CONVENIENT AND EASY TO USE I GUESS LMAO
  
  for(var n = 0; n < blocks.length; n++) {
    if(blocks[n].blockImg == waterImg) {
      for(var f = 0; f < blocks.length; f++) {
        if(blocks[n].coordX == blocks[f].coordX && blocks[n].coordY == blocks[f].coordY && blocks[n].blockImg != blocks[f].blockImg) {
          //the blocks are different images, but are overlapping. delete the one that has the water img
          if(blockPriority[blocks[n].type] > blockPriority[blocks[f].type]) {
            blocks.splice(f, 1);
          } else {
            blocks.splice(n, 1);
          }
          if(blocks[n].coordX == 15 && blocks[n].coordY == 2) {
            console.log(blocks[n])
          }
        }
      }
    }
  }
  
  console.log("done")

	frameRate(fr);
}

function draw() {
	if (moving == true) {
		fCount += 1;
	}
	//player :)
	background("cyan");
	rectMode(CENTER);
	imageMode(CENTER)
	for (var i = 0; i < blocks.length; i++) {
		blocks[i].display()
	}
  noFill();
  stroke(20);
  rect(90, 25, 150, 25)
  rectMode(CORNER);
  fill("red")
  noStroke();
  rect(15, 12.5, 150/(maxHealth/health), 25)
  noFill();
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

	if (fCount >= speed) {
		fCount = 0;
		moving = false;
	}
	if (moving == true && fCount < speed && colliding == false) {
		for (var i = 0; i < blocks.length; i++) {
			blocks[i].update(currentDir, speed);
		}
		//note, make player about the size of 1 unit, when done so, change the values in the rects below to 75 cuz 50/2 + 25 so ye
		movementBlock.display()
		movementBlock.update(currentDir, speed);
	}
	image(character, wWidth / 2, wHeight / 2, 80, 80);
	playerCoords = "X: " + characterX.toString() + " Y: " + characterY.toString();
	text(playerCoords, 100, 100)
}