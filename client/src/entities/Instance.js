import { generateID } from "../utilities/general/functions/utilityFunctions";

// This is our main class we will build off of
// Be warned to all those who hate math.
class Instance {
  constructor(
    type = "",
    options = {
      pos: { x: 0, y: 0 },
      size: { x: 0, y: 0 },
      speed: { x: 0, y: 0, actual: 0 },
      color: "",
      spriteSrc: "",
      useBounds: false,
      usePhysics: false,
      useCollision: false,
      isStatic: false,
    }
  ) {
    this.id = generateID(10);
    this.type = type || "box";
    this.size = options.size || { x: 10, y: 10 };
    this.pos = options.pos || { x: 0, y: 0 };
    this.speed = options.speed || { x: 0, y: 0, actual: 0 };
    this.color = options.color || "black";
    this.spriteSrc = options.spriteSrc || "";
    this.useBounds = options.useBounds || false;
    this.usePhysics = options.usePhysics || false;
    this.useCollision = options.useCollision || false;
    this.isStatic = options.isStatic || false;
  }

  // Drawing a basic rectangle
  drawRect(ctx) {
    ctx.beginPath();
    ctx.rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // Drawing a basic circle
  drawCircle(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size.x, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // Drawing a sprite (non animated)
  drawImage(ctx) {
    const img = new Image(this.size.x, this.size.y);
    img.src = this.spriteSrc;
    ctx.drawImage(img, this.pos.x, this.pos.y, this.size.x, this.size.y);
  }

  // Change position based on speed
  update() {
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
  }

  // This is the method we will always call from the function
  // we pass to the engine. It's routing is already setup
  render(ctx, targets, canvas) {
    switch (this.type) {
      case "box":
        this.drawRect(ctx);
        break;
      case "circle":
        this.drawCircle(ctx);
        break;
      case "sprite":
        this.drawImage(ctx);
        break;
    }
    // We update the instance then check for collision on new position
    this.update();
    if (targets) this.checkCollision(targets, canvas);
  }

  // Our collision routing function
  checkCollision(targets = [], canvas = null) {
    if (this.useCollision) this.checkEntityCollision(targets);
    if (this.useBounds) this.checkBoundsCollision(canvas);
  }

  verifyCollision(target) {
    switch (this.type) {
      // Square to square collision
      case "box":
      case "sprite": {
        return !(
          this.pos.x > target.pos.x + target.size.x ||
          this.pos.x + this.size.x < target.pos.x ||
          this.pos.y > target.pos.y + target.size.y ||
          this.pos.y + this.size.y < target.pos.y
        );
      }
      // Circle to circle collision
      case "circle": {
        const dx = target.pos.x - this.pos.x;
        const dy = target.pos.y - this.pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const sumOfRadii = this.size.x + target.size.x;
        return distance <= sumOfRadii;
      }
      // Todo: add circle to square collision
    }
  }

  // Checking for entity collision
  checkEntityCollision(targets) {
    if (targets) {
      targets.forEach((target) => {
        if (this.id !== target.id) {
          if (this.verifyCollision(target)) this.handleCollision(target);
        }
      });
    }
  }

  // Our method used to have our instance react after colliding
  handleCollision(target) {
    if (!this.usePhysics) {
      // Pushing back a few pixels to prevent collision vacuum
      this.pos.x -= this.speed.x;
      this.pos.y -= this.speed.y;
      this.speed.x = 0;
      this.speed.y = 0;
    } else {
      // Calc the collision vector
      const vCollision = {
        x: target.pos.x - this.pos.x,
        y: target.pos.y - this.pos.y,
      };
      // Calc the distance of the collision vector
      const distance = Math.sqrt(
        (target.pos.x - this.pos.x) * (target.pos.x - this.pos.x) +
          (target.pos.y - this.pos.y) * (target.pos.y - this.pos.y)
      );
      // Calc the normalized collision vector
      const vCollisionNorm = {
        x: vCollision.x / distance,
        y: vCollision.y / distance,
      };
      // Calc collision velocity/speed
      const vRelativeVelocity = {
        x: this.speed.x - target.speed.x,
        y: this.speed.y - target.speed.y,
      };
      const speed =
        vRelativeVelocity.x * vCollisionNorm.x +
        vRelativeVelocity.y * vCollisionNorm.y;
      // Check speed direction towards or away from target
      if (speed < 0) {
        return;
      }
      // Assigning new values
      this.speed.x -= speed * vCollisionNorm.x;
      this.speed.y -= speed * vCollisionNorm.y;
      if (!target.isStatic) {
        target.speed.x += speed * vCollisionNorm.x;
        target.speed.y += speed * vCollisionNorm.y;
      }
    }
  }

  // Checking canvas bounds collision
  checkBoundsCollision(canvas) {
    switch (this.type) {
      case "box":
      case "sprite":
        {
          // Checking left bound collision
          if (this.pos.x < 0) {
            if (this.usePhysics) {
              this.speed.x *= -1;
            } else {
              this.pos.x = 0;
              this.speed.x = 0;
              this.speed.y = 0;
            }
          }
          // Checking right bound collision
          if (this.pos.x > canvas.width - this.size.x) {
            if (this.usePhysics) {
              this.speed.x *= -1;
            } else {
              this.pos.x = canvas.width - this.size.x;
              this.speed.x = 0;
              this.speed.y = 0;
            }
          }
          // Checking top bound collision
          if (this.pos.y < 0) {
            if (this.usePhysics) {
              this.speed.y *= -1;
            } else {
              this.pos.y = 0;
              this.speed.x = 0;
              this.speed.y = 0;
            }
          }
          // Checking bottom bound collision
          if (this.pos.y > canvas.height - this.size.y) {
            if (this.usePhysics) {
              this.speed.y *= -1;
            } else {
              this.pos.y = canvas.height - this.size.y;
              this.speed.x = 0;
              this.speed.y = 0;
            }
          }
        }
        break;
      case "circle":
        {
          // Checking left bound collision
          if (this.pos.x - this.size.x < 0) {
            if (this.usePhysics) {
              this.speed.x *= -1;
            } else {
              this.pos.x = 0 + this.size.x;
              this.speed.x = 0;
              this.speed.y = 0;
            }
          }
          // Checking right bound collision
          if (this.pos.x > canvas.width - this.size.x) {
            if (this.usePhysics) {
              this.speed.x *= -1;
            } else {
              this.pos.x = canvas.width - this.size.x;
              this.speed.x = 0;
              this.speed.y = 0;
            }
          }
          // Checking top bound collision
          if (this.pos.y - this.size.y < 0) {
            if (this.usePhysics) {
              this.speed.y *= -1;
            } else {
              this.pos.y = 0 + this.size.y;
              this.speed.x = 0;
              this.speed.y = 0;
            }
          }
          // Checking bottom bound collision
          if (this.pos.y > canvas.height - this.size.y) {
            if (this.usePhysics) {
              this.speed.y *= -1;
            } else {
              this.pos.y = canvas.height - this.size.y;
              this.speed.x = 0;
              this.speed.y = 0;
            }
          }
        }
        break;
    }
  }
}

export default Instance;
