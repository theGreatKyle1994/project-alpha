import Instance from "../Instance";
import controlObj from "../../utilities/controls/controlBindings";

class PlayerInstance extends Instance {
  constructor(id, type, options) {
    super(id, type, options);
    this.spawnPoint = null;
    this.isInventoryOpen = false;
    this.keyObj = controlObj;
  }
  // method used to check any control inputs made by player
  checkControls(e) {
    // modification of keyObj to input booleans based on key press
    if (e.type == "keydown") this.keyObj[e.key.toLowerCase()] = true;
    if (e.type == "keyup") this.keyObj[e.key.toLowerCase()] = false;
    // Listen for movement controls
    if (
      this.keyObj.w ||
      !this.keyObj.w ||
      this.keyObj.a ||
      !this.keyObj.a ||
      this.keyObj.s ||
      !this.keyObj.s ||
      this.keyObj.d ||
      !this.keyObj.d
    )
      this.doMovement(this.keyObj);
    // Listen for inventory controls
    if (this.keyObj.tab) this.toggleInventory();
  }
  // Open/close inventory
  toggleInventory() {
    // toggle inventory
    this.isInventoryOpen = !this.isInventoryOpen;
    console.log(this.isInventoryOpen);
  }
  // Move player
  doMovement(keyObj) {
    console.log(keyObj);
    // W / S Key (up)
    if (keyObj.w) this.speed.y = -this.speed.actual;
    else if (keyObj.s) this.speed.y = this.speed.actual;
    else this.speed.y = 0;
    // A / D Key (left)
    if (keyObj.a) this.speed.x = -this.speed.actual;
    else if (keyObj.d) this.speed.x = this.speed.actual;
    else this.speed.x = 0;
    // diagonal movement speed adjustment, if both x and y axis are used, we
    // apply the product of the square root of both directions by 0.5 sqrt(0.5) per axis
    // if you comment this out you will find diagonal movement is too fast
    if (this.speed.x && this.speed.y) {
      this.speed.x *= Math.SQRT1_2;
      this.speed.y *= Math.SQRT1_2;
    }
  }
}

export default PlayerInstance;
