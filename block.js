class block {
	constructor(w, h, offsetx, offsety, speedT, collidable, blockImg, type) {
		this.width = w;
		this.height = h;
		this.osX = (offsetx - speedT / 16);
		this.osY = (offsety - speedT / 16);
    
    
    
    this.coordX = round((this.osX - (wWidth / 2)) / (50 * -1));
		this.coordY = round((this.osY - (wHeight / 2)) / (50 * -1));
    this.type = type;
    
		
		this.color = color;
		this.collidable = collidable;
    this.blockImg = blockImg;
		//console.log("X coord: " + this.coordX + " Y coord: " + this.coordY)
	}

	update(key, spd) {
		//listens for keypressed
		if (key == UP_ARROW) {
			//up
			this.osY += 50 / spd;
		} else if (key == DOWN_ARROW) {
			//down
			this.osY -= 50 / spd;
		} else if (key == LEFT_ARROW) {
			//left
			this.osX += 50 / spd;
		} else if (key == RIGHT_ARROW) {
			//right
			this.osX -= 50 / spd;
		}
	}
	display() {
		image(this.blockImg, this.osX, this.osY, this.width, this.height)
	}

}