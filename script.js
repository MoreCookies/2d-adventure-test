 var characterX = 0;
var characterY = 0;
var wWidth = 1000;
var wHeight = 500;
var fr = 50; //i hope your computer can run 50 fps lol
var moving = false;
let fCount = 0;
var currentDir = null;
let speed = fr / 5;
var blocks = [];
var blockPriority = { "grass": 1, "rock": 3, "water": 0, "berry": 2 };
var health = 100;
var maxHealth = 100;
var randomObject = 0;
var menuButton = 0;
var buttons = [];
var buttonDisplays = [];
var invButtons = [];
//define state const values
const IDLE = 1;
const INVENTORY = 2;
//current state
var currentState = IDLE;

function preload() {
  character = loadImage("character.png");
  grassImg = loadImage("Blocks/Grass.png");
  waterImg = loadImage("Blocks/Water.png");
  rockImg = loadImage("Blocks/Rock.png");
  borderImg = loadImage("Border.png");
  berryImg = loadImage("Blocks/Berry-Bush.png");
  invButtonImg = loadImage("menu/inventory-icon.png");
  menuBackground = loadImage("menu/menu-background.png");
  interactImg = loadImage("menu/interact.png");
  
}

function setup() {
  menuButton = new button(75, 75, 15, 50, invButtonImg, "inventory");
  buttons.push(menuButton);
  createCanvas(wWidth, wHeight);

  for (var x = 0; x < 12; x++) {
    for (var y = 0; y < 12; y++) {
      blocks.push(new block(50, 50, x * 50, y * 50, speed, false, grassImg, "grass", false));
    }
  }

  for (var x = 0; x < 12; x++) {
    for (var y = 0; y < 12; y++) {
      randomObject = round(random(0.5, 10));
      if (randomObject == 6 && x != characterX && y != characterY) {
        blocks.push(new block(50, 50, x * 50, y * 50, speed, true, berryImg, "berry", true));
      }
    }
  }

  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      blocks.push(new block(50, 50, x * 50, y * 50, speed, true, rockImg, "rock", false));
    }
  }
  for (var x = -15; x < 25; x++) {
    for (var y = -25; y < 20; y++) {
      blocks.push(new block(50, 50, x * 50, y * 50, speed, true, waterImg, "water", false));
    }
  }



  // TARGET SPOTTED, WATER DELETING DOESNT WORK PROPERLY
  // SOLUTION INSTEAD OF LIKE BURNING YOUR COMPUTER MAKE WATER WITH THE GRASS FOR LESS SADNESS AND STUFF HOWEVER WILL MAKE IT A LOT LESS CONVENIENT AND EASY TO USE I GUESS LMAO
  //removes all overlapping blocks :)
  for (var n = 0; n < blocks.length; n++) {
    for (var f = 0; f < blocks.length; f++) {
      if (blocks[n].coordX == blocks[f].coordX && blocks[n].coordY == blocks[f].coordY && blocks[n].blockImg != blocks[f].blockImg) {
        //the blocks are different images, but are overlapping. delete the one that has the water img
        if (blockPriority[blocks[n].type] > blockPriority[blocks[f].type]) {
          blocks.splice(f, 1);
        } else {
          blocks.splice(n, 1);
        }
        if (blocks[n].coordX == 15 && blocks[n].coordY == 2) {
          console.log(blocks[n]);
        }
      }
    }
  }

  console.log("done");

  frameRate(fr);
}
//open menu 
function draw() {

  if (fCount >= speed) {
    fCount = 0;
    moving = false;
  }
  if (moving == true) {
    fCount += 1;
  }
  if (moving == false) {
    currentDir = keyCode;
  
  collisionDetection();
  }
  background("cyan");
  rectMode(CENTER);
  imageMode(CENTER);
  for (var i = 0; i < blocks.length; i++) {
    blocks[i].display()
  }
  //health bar
  noFill();
  stroke(20);
  rect(90, 25, 150, 25);
  rectMode(CORNER);
  fill("red");
  noStroke();
  rect(15, 12.5, 150 / (maxHealth / health), 25);
  noFill();
  //

  //collision detection B)

  //

  //update everything in array blocks
  if (moving == true && fCount < speed && currentState == IDLE) {
    //updates all blocks, in the currentdir in case like the player is moving or smth
    for (var i = 0; i < blocks.length; i++) {
      blocks[i].update(currentDir, speed);
    }
    //note, make player about the size of 1 unit, when done so, change the values in the rects below to 75 cuz 50/2 + 25 so ye
    //movementBlock.display();
    //movementBlock.update(currentDir, speed);
  }
  //player :)
  image(character, wWidth / 2, wHeight / 2, 80, 80);
  rectMode(CORNER);
  stroke("black");
  fill("red");
  //interaction
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].interactable == true) {
      if (Math.abs(blocks[i].coordX - characterX) <= 1 && Math.abs(blocks[i].coordY - characterY) <= 1) {
        //player is near an interactable thing
        if(currentDir == UP_ARROW) {
          
        } else if(currentDir == DOWN_ARROW) {

        } else if(currentDir == LEFT_ARROW) {

        } else if(currentDir == RIGHT_ARROW) {

        }
        image(interactImg, blocks[i].osX, blocks[i].osY, 25, 25)
        /*
        if(keyCode == ) {
          if(block[i].type == "bush")...
          Basically, check the type of the block
          then update the interacted variable in it
          and then do the function which like idk gives you berries or smth
        }
        */
      }
    }

    /*
    if(currentDir == UP_ARROW) {
      
    } else if(currentDir == DOWN_ARROW) {

    } else if(currentDir == LEFT_ARROW) {
      
    } else if(currentDir == RIGHT_ARROW) {

    }
    */
  }
  



  if (currentState == INVENTORY) {
    imageMode(CORNER);
    image(menuBackground, 150, 50, 700, 400);
    for (var x = 0; x < 40; x++) {
      for (var y = 0; y < 20; y++) {
      }
    }
  }
  for (var i = 0; i < buttons.length; i++) {
    //do the checking for the buttons
    buttons[i].display();
  }
  noFill();
  //debuggin text pog
  text("x: " + characterX + " y: " + characterY + " CurrentDir: " + currentDir, 100, 100)
}

function mouseClicked() {
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].buttonCheck((buttons[i].w + buttons[i].h / 2) / 30)) {
      //check the button type
      //do whatever is needed based on the button type
      buttons[i].display();
      if (buttons[i].type == "inventory" && currentState == IDLE) {
        currentState = INVENTORY;
      } else if (buttons[i].type == "inventory" && currentState == INVENTORY) {
        currentState = IDLE;
      }
    }
  }

}