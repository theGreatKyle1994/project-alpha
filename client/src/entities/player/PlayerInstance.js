import Instance from "../Instance";
import { normalizeVector } from "../../utilities/core/functions/math/assortedMath";

class PlayerInstance extends Instance {
  constructor(
    id = "",
    type = "",
    options = {
      pos: { x: 0, y: 0 },
      size: { x: 0, y: 0 },
      speed: { x: 0, y: 0, actual: 0 },
      color: "",
      spriteSrc: "",
      useBounds: false,
      useCollision: false,
      useCollisionOutline: false,
      isStatic: false,
    }
  ) {
    super(id, type, options);
    this.spawnPoint = null;
  }
  // method used to check any control inputs made by player
  checkControls(keyObj) {
    if (
      keyObj.w ||
      !keyObj.w ||
      keyObj.a ||
      !keyObj.a ||
      keyObj.s ||
      !keyObj.s ||
      keyObj.d ||
      !keyObj.d
    )
      this.doMovement(keyObj);
  }
  // Move player
  doMovement(keyObj) {
    // W / S Key (up)
    if (keyObj.w) this.speed.y = -this.speed.actual;
    else if (keyObj.s) this.speed.y = this.speed.actual;
    else this.speed.y = 0;
    // A / D Key (left)
    if (keyObj.a) this.speed.x = -this.speed.actual;
    else if (keyObj.d) this.speed.x = this.speed.actual;
    else this.speed.x = 0;
    // diagonal movement speed adjustment if both x and y axis are used
    // if you comment this out you will find diagonal movement is too fast
    if (this.speed.x && this.speed.y) {
      this.speed = normalizeVector(this.speed);
    }
  }
}

export default PlayerInstance;
