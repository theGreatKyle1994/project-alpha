import Item from "../Item.js";
import { applyChance } from "../../utilities/general/functions/utilityFunctions.js";

class Weapon extends Item {
  constructor(...creatorObj) {
    super({
      name: creatorObj.name,
      description: creatorObj.description,
      image: creatorObj.image,
    });
  }
}

export default Weapon;
