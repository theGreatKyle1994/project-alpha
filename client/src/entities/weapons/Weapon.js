import Item from "../Item.js";
import { applyChance } from "../../utilities/general/functions/utilityFunctions.js";

class Weapon extends Item {
  constructor(
    creatorObj = {
      name,
      description,
      image,
      hitChance,
      baseDam,
      critChance,
      critDam,
    }
  ) {
    super({
      name: creatorObj.name,
      description: creatorObj.description,
      image: creatorObj.image,
    });
    this.hitChance = creatorObj.hitChance || 75; // Miss calc
    this.baseDam = creatorObj.baseDam || 1; // Basic attack
    this.critChance = creatorObj.critChance || 5; // Crit chance calc
    this.critDamMult = creatorObj.critDam || 1.0; // Crit dam calc
  }
  // Calculate outgoing damage
  calcDamage(type = "basic") {
    // Create base return obj
    const outDamInfo = {
      isHit: false,
      isCrit: false,
      damOut: this.baseDam,
    };
    // Calc if a hit is made and return on miss
    if (applyChance(this.hitChance)) {
      console.log("Hit");
      outDamInfo.isHit = true;
      // Roll for crit strike
      if (applyChance(this.critChance)) {
        console.log("Crit");
        outDamInfo.isCrit = true;
        outDamInfo.damOut *= this.critDamMult;
      }
      return outDamInfo;
    } else {
      console.log("Miss");
      outDamInfo.isHit = false;
      outDamInfo.damOut = 0;
      return outDamInfo;
    }
  }
}

export default Weapon;
