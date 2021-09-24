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
    if(mouseX > this.x-big && mouseX < this.x+this.w+big && mouseY > this.y-big && mouseY < this.y+this.h+big && mouseIsPressed) {
      return true
    } else {
      return false
    }
  }

  display() {
    imageMode(CORNER)
    image(this.picture, this.x, this.y, this.w, this.h);
  }
}
