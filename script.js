 var scrollX = 0;
var scrollY = 0;
var wWidth = 1000;
var wHeight = 1000;
var fr = 30;
var moving = false;
let fCount = 0;
var currentDir = null;
let speed = 5;
class block {
  constructor(w, h, offsetx, offsety, speedT, color) {
    this.width = w;
    this.height = h;
    this.osX = offsetx-speedT/16;
    this.osY = offsety-speedT/16;
    this.coordX = round((this.osX-(wWidth/2))/(50*-1));
    this.coordY = round((this.osY-(wHeight/2))/(50*-1));
    this.color = color;
    console.log("X coord: " + this.coordX + " Y coord: " + this.coordY)
  }
  
  update(key, spd) {
    //listens for keypressed
    if(key == UP_ARROW) {
      //up
      this.osY += 50/spd;
    } else if(key == DOWN_ARROW) {
      //down
      this.osY -= 50/spd;
    } else if(key == LEFT_ARROW) {
      //left
      this.osX += 50/spd;
    } else if(key == RIGHT_ARROW) {
      //right
      this.osX -= 50/spd;
    }
  }
  display(doFill) {
    if(doFill) {
      fill(this.color);
    } else {
      stroke(5);
      noFill();
    }
    rectMode(CENTER);
    rect(this.osX, this.osY, this.width, this.height)
  }
  
}

function preload() {
  character = loadImage("character.png")
}

function setup() {
  createCanvas(wWidth, wHeight);
  testBlock = new block(50, 50, 100, 100, speed, "green");
  testBlock2 = new block(50, 50, 150, 150, speed, "green");
  frameRate(fr);
}

function draw() {
  if(moving == true) {
    fCount += 1;
  }
  //player :)
  background("yellow");
  rectMode(CENTER);
  fill("green");
  imageMode(CENTER)
  
  testBlock.display(true)
  
  testBlock2.display(true)
  if(keyIsPressed && moving == false) {
    moving = true;
    currentDir = keyCode;
    movementBlock2 = new block(50, 50, wWidth/2, wHeight/2, speed, "cyan");
    if(currentDir == UP_ARROW) {
      //up
      movementBlock = new block(50, 50, (wWidth/2), (wHeight/2)-50, speed, "cyan");
    } else if(currentDir == DOWN_ARROW) {
      //down
      movementBlock = new block(50, 50, (wWidth/2), (wHeight/2)+50, speed, "cyan");
    } else if(currentDir == LEFT_ARROW) {
      //left
      movementBlock = new block(50, 50, (wWidth/2)-50, (wHeight/2), speed, "cyan");
    } else if(currentDir == RIGHT_ARROW) {
      //right
      movementBlock = new block(50, 50, (wWidth/2)+50, (wHeight/2), speed, "cyan");
    }
  }
  
  if(fCount >= speed) {
    fCount = 0;
    moving = false;
  }
  if(moving == true && fCount < speed) {
    testBlock.update(currentDir, speed)
    testBlock2.update(currentDir, speed)
    //note, make player about the size of 1 unit, when done so, change the values in the rects below to 75 cuz 50/2 + 25 so ye
    movementBlock.display(true)
    movementBlock.update(currentDir, speed);
    movementBlock2.display(false);
    movementBlock2.update(currentDir, speed);
    console.log(movementBlock.osX)
  }
  image(character, wWidth/2, wHeight/2, 50, 50);
}