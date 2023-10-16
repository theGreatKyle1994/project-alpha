import Item from "../Item.js";
import { applyChance } from "../../utilities/general/functions/utilityFunctions.js";

class Weapon extends Item {
  constructor(creatorObj) {
    super({
      name: creatorObj.name,
      description: creatorObj.description,
      image: creatorObj.image,
    });
    this.baseDam = creatorObj.baseDam || 0; // Basic attack
    this.critChance = creatorObj.critChance || 0.0; // Double Dam calc
    this.hitChance = creatorObj.hitChance || 0.0; // Miss calc
  }
  // Calculate outgoing damage
  calcDamage() {
    // Create base return obj
    const outDamInfo = {
      isHit: true,
      isCrit: false,
      outDam: this.baseDam, 
    };
    // Calc if a hit is made and return on miss
    if (applyChance(this.hitChance)) {
      outDamInfo.isHit = false;
      outDamInfo.outDam = 0;
      return outDamInfo;
    }
    // Roll for crit strike
    else if (applyChance(this.critChance)) {
      outDamInfo.isCrit = true;
      outDam *= 2;
      return outDamInfo;
    }
  }
}

export default Weapon;
