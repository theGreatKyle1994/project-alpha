import { generateID } from "../utilities/general/functions/utilityFunctions";

class Instance {
  constructor(
    type = "box",
    size = { x: 10, y: 10 },
    pos = { x: 0, y: 0 },
    speed = { x: 0, y: 0 },
    options = { useBounds: false, usePhysics: false, useCollision: false },
    spriteSrc = ""
  ) {
    this.id = generateID(10);
    this.type = type;
    this.size = size;
    this.pos = pos;
    this.speed = speed;
    this.spriteSrc = spriteSrc;
    this.options = options;
    this.isColliding = false;
  }

  drawRect(ctx) {
    ctx.beginPath();
    ctx.rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    ctx.fillStyle = "black";
    ctx.fill();
  }

  drawCircle(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size.x, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
  }

  drawImage(ctx) {
    const img = new Image(this.size.x, this.size.y);
    img.src = this.spriteSrc;
    ctx.drawImage(img, this.pos.x, this.pos.y, this.size.x, this.size.y);
  }

  render(ctx) {
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
  }

  checkCollision(targets = [], canvas = null) {
    if (this.options.useCollision) {
      this.checkEntityCollision(targets);
    }
    if (this.options.useBounds) this.checkBoundsCollision(canvas);
  }

  checkEntityCollision(targets) {
    if (targets) {
      targets.forEach((target) => {
        if (this.id !== target.id) {
          switch (this.type) {
            case "box":
            case "sprite": {
              if (
                this.pos.x > target.pos.x + target.size.x ||
                this.pos.x + this.size.x < target.pos.x ||
                this.pos.y > target.pos.y + target.size.y ||
                this.pos.y + this.size.y < target.pos.y
              )
                this.isColliding = false;
              else this.isColliding = true;
              break;
            }
            case "circle": {
              const dx = target.pos.x - this.pos.x;
              const dy = target.pos.y - this.pos.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const sumOfRadii = this.size.x + target.size.x;
              if (distance <= sumOfRadii) {
                this.isColliding = true;
              } else {
                this.isColliding = false;
              }
              break;
            }
          }
          this.handleCollision(target);
        }
      });
    }
  }

  checkBoundsCollision(canvas) {
    switch (this.type) {
      case "box":
      case "sprite":
        {
          if (this.pos.x < 0) {
            if (this.options.usePhysics) {
              this.speed.x *= -1;
            } else {
              this.pos.x = 0;
              this.speed.x = 0;
              this.speed.y = 0;
            }
          }
          if (this.pos.x > canvas.width - this.size.x) {
            if (this.options.usePhysics) {
              this.speed.x *= -1;
            } else {
              this.pos.x = canvas.width - this.size.x;
              this.speed.x = 0;
              this.speed.y = 0;
            }
          }
          if (this.pos.y < 0) {
            if (this.options.usePhysics) {
              this.speed.y *= -1;
            } else {
              this.pos.y = 0;
              this.speed.x = 0;
              this.speed.y = 0;
            }
          }
          if (this.pos.y > canvas.height - this.size.y) {
            if (this.options.usePhysics) {
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
          if (this.pos.x - this.size.x < 0) {
            if (this.options.usePhysics) {
              this.speed.x *= -1;
            } else {
              this.pos.x = 0 + this.size.x;
              this.speed.x = 0;
              this.speed.y = 0;
            }
          }
          if (this.pos.x > canvas.width - this.size.x) {
            if (this.options.usePhysics) {
              this.speed.x *= -1;
            } else {
              this.pos.x = canvas.width - this.size.x;
              this.speed.x = 0;
              this.speed.y = 0;
            }
          }
          if (this.pos.y - this.size.y < 0) {
            if (this.options.usePhysics) {
              this.speed.y *= -1;
            } else {
              this.pos.y = 0 + this.size.y;
              this.speed.x = 0;
              this.speed.y = 0;
            }
          }
          if (this.pos.y > canvas.height - this.size.y) {
            if (this.options.usePhysics) {
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

  handleCollision(target) {
    if (this.isColliding) {
      if (!this.options.usePhysics) {
        this.speed.x = 0;
        this.speed.y = 0;
      } else {
        const vCollision = {
          x: target.pos.x - this.pos.x,
          y: target.pos.y - this.pos.y,
        };
        const distance = Math.sqrt(
          (target.pos.x - this.pos.x) * (target.pos.x - this.pos.x) +
            (target.pos.y - this.pos.y) * (target.pos.y - this.pos.y)
        );
        const vCollisionNorm = {
          x: vCollision.x / distance,
          y: vCollision.y / distance,
        };
        const vRelativeVelocity = {
          x: this.speed.x - target.speed.x,
          y: this.speed.y - target.speed.y,
        };
        const speed =
          vRelativeVelocity.x * vCollisionNorm.x +
          vRelativeVelocity.y * vCollisionNorm.y;
        if (speed < 0) {
          return;
        }
        this.speed.x -= speed * vCollisionNorm.x;
        this.speed.y -= speed * vCollisionNorm.y;
        target.speed.x += speed * vCollisionNorm.x;
        target.speed.y += speed * vCollisionNorm.y;
      }
    }
  }

  update(newSpeedX = 0, newSpeedY = 0, newSizeX = 0, newSizeY = 0) {
    if (newSpeedX || newSpeedY) {
      this.speed.x = newSpeedX;
      this.speed.y = newSpeedY;
    }
    if (newSizeX || newSizeY) {
      this.size.x = newSizeX;
      this.size.y = newSizeY;
    }
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
  }
}

export default Instance;
