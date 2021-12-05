class game {
  constructor(charX, charY, wWidth, wHeight, fr, blockPriority, ) {
    var characterX = 0;
    var characterY = 0;
    var wWidth = 1000;
    var wHeight = 500;
    var fr = 25;
    var moving = false;
    var fCount = 0;
    var currentDir = null;
    var speed = fr / 5;
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
  }
  setup() {
    //create blocks
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
  checkInput() {
    //check on buttons

    //collision detection and keyboard input
  }
  update() {
    //update blocks wait that's in check input
  }
}