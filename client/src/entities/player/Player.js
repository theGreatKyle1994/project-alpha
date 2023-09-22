import Entity from "../Entity";
import { applyRange } from "../../utilities/general/functions/utilityFunctions";

class Player extends Entity {
  constructor(name, health, damage) {
    super(name, health, damage);
    this.xp = 0;
    this.xpCap = 100;
    this.isInCombat = false;
    this.weapon = null
  }

  levelUp() {
    this.level += 1;
  }

  setXp(xpIn) {
    this.xp += xpIn;
    while (this.xp >= this.xpCap) {
      this.xp = this.xp - this.xpCap;
      this.xpCap += applyRange(5, 20, this.level);
      this.levelUp();
    }
  }

  setIsInCombat(isCombat) {
    this.isInCombat = isCombat;
  }
}

export default Player;
