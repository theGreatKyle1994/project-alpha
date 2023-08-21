import Entity from "./Entity";

class Player extends Entity {
  constructor(name, health, damage) {
    super(name, health, damage);
    this.xp = 0;
    this.xpCap = 100;
  }

  levelUp() {
    this.level += 1;
    console.log("Levek up!", this.level);
  }

  setXp(xpIn) {
    this.xp += xpIn;
    while (this.xp >= this.xpCap) {
      this.xp = this.xp - this.xpCap;
      this.xpCap += 100;
      this.levelUp();
    }
  }
}

export default Player;
