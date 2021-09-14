class enemy extends block {
  constructor(hp, dmg, moveInterval, attackSpd, img, osX, osY, speedT, w, h, type) {
    super(w, h, osX, osY, speedT, true, img, type);
    this.hp = hp;
    this.dmg = dmg;
    this.moveSpd = moveInterval;
    this.atkSpd = attackSpd;
    this.enemyImg = img;
    this.moving = false;
  }

  move() {
    
  }
}
/*
umm
pathfinding in case player like attacks thing or like normally hostile
figure out some sorta pathfinding thing
damaging stuff
link up with player
idk

*/