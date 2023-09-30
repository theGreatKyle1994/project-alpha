import Instance from "../Instance";

class PlayerInstance extends Instance {
  constructor(type, options) {
    super(type, options);
    this.keyObj = { w: false, a: false, s: false, d: false, alt: false };
  }

  // Spawn point algo
  findSpawn(type, map) {
    switch (type) {
      // Random based on free space
      case "random": {
        const openSpacesLength = map.openSpace.length;
        const tileChoice =
          map.openSpace[Math.floor(Math.random() * openSpacesLength)];
        // Grabbing center point of chosen tile
        this.pos.x = tileChoice.pos.x + tileChoice.size.x / 2;
        this.pos.y = tileChoice.pos.y + tileChoice.size.y / 2;
        return this.pos;
      }
      default:
        break;
    }
  }
  // method used to change which direction the shape is going based on key input
  checkMovement(e) {
    // modification of keyObj to input booleans based on key press
    // depending on event
    if (e.type == "keydown") this.keyObj[e.key.toLowerCase()] = true;
    if (e.type == "keyup") this.keyObj[e.key.toLowerCase()] = false;
    // W / S Key (up)
    if (this.keyObj.w) {
      this.speed.y = -this.speed.actual;
    } else if (this.keyObj.s) {
      this.speed.y = this.speed.actual;
    } else {
      this.speed.y = 0;
    }
    // A / D Key (left)
    if (this.keyObj.a) {
      this.speed.x = -this.speed.actual;
    } else if (this.keyObj.d) {
      this.speed.x = this.speed.actual;
    } else {
      this.speed.x = 0;
    }
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
