class button {
  constructor(w, h, x, y, picture, type) {
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.picture = picture;
    this.type = type;
    this.clicked = false;
  }

  buttonCheck(big) {
    //do note that i did remove mouseIsPressed from this if statement, if needed for logic purposes, you may redo it.
    if(mouseX > this.x-big && mouseX < this.x+this.w+big && mouseY > this.y-big && mouseY < this.y+this.h+big) {
      return true
    }
    return false
  }

  display() {
    imageMode(CORNER)
    image(this.picture, this.x, this.y, this.w, this.h);
  }
}
