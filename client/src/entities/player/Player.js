import Entity from "../Entity";
import { applyRange } from "../../utilities/general/functions/utilityFunctions";

class Player extends Entity {
  constructor(name = "", health = 0) {
    super(name, health);
    this.xp = 0;
    this.xpCap = 100;
  }
  // Base method used for leveling up
  levelUp() {
    this.level += 1;
  }
  // Base method used for setting new xp values
  setXp(xpIn) {
    this.xp += xpIn;
    while (this.xp >= this.xpCap) {
      this.xp = this.xp - this.xpCap;
      this.xpCap += applyRange(5, 20, this.level);
      this.levelUp();
    }
  }
}

export default Player;
