import { generateID } from "../utilities/general/functions/utilityFunctions";

class Instance {
  constructor(
    type = "box",
    size = { x: 10, y: 10 },
    pos = { x: 0, y: 0 },
    speed = { x: 0, y: 0 },
    spriteSrc = ""
  ) {
    this.id = generateID(10);
    this.type = type;
    this.sizeX = size.x;
    this.sizeY = size.y;
    this.x = pos.x;
    this.y = pos.y;
    this.speed = speed;
    this.spriteSrc = spriteSrc;
    this.isColliding = false;
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

  drawRect(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.sizeX, this.sizeY);
    ctx.fillStyle = "black";
    ctx.fill();
  }

  drawCircle(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.sizeX, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
  }

  drawImage(ctx) {
    const img = new Image(this.sizeX, this.sizeY);
    img.src = this.spriteSrc;
    ctx.drawImage(img, this.x, this.y, this.sizeX, this.sizeY);
  }

  checkCollision(
    targets = [],
    bounds = { useBounds: false, useBounce: false },
    canvas = {}
  ) {
    if (targets) {
      targets.forEach((target) => {
        if (this.id !== target.id) {
          switch (this.type) {
            case "box":
            case "sprite":
              {
                if (
                  this.x < target.x + target.sizeX &&
                  this.x + this.sizeX > target.x &&
                  this.y < target.y + target.sizeY &&
                  this.y + this.sizeY > target.y
                )
                  this.isColliding = true;
                else this.isColliding = false;
              }
              break;
            case "circle": {
              const dx = target.x - this.x;
              const dy = target.y - this.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const sumOfRadii = this.sizeX + target.sizeX;
              if (distance <= sumOfRadii) {
                this.isColliding = true;
              } else {
                this.isColliding = false;
              }
            }
          }
          if (this.isColliding) {
            if (!bounds.useBounce) {
              this.speed.x = 0;
              this.speed.y = 0;
            }
            const vCollision = { x: target.x - this.x, y: target.y - this.y };
            const distance = Math.sqrt(
              (target.x - this.x) * (target.x - this.x) +
                (target.y - this.y) * (target.y - this.y)
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
        return;
      });
    }
    switch (this.type) {
      case "box":
      case "sprite": {
        if (bounds.useBounds) {
          if (this.x < 0) {
            this.x = 0;
            this.speed.x *= -1;
          }
          if (this.x > canvas.width - this.sizeX) {
            this.x = canvas.width - this.sizeX;
            this.speed.x *= -1;
          }
          if (this.y < 0) {
            this.y = 0;
            this.speed.y *= -1;
          }
          if (this.y > canvas.height - this.sizeY) {
            this.y = canvas.height - this.sizeY;
            this.speed.y *= -1;
          }
        }
        break;
      }
      case "circle": {
        if (bounds.useBounds) {
          if (this.x - this.sizeX < 0) {
            this.x = 0 + this.sizeX;
            this.speed.x *= -1;
          }
          if (this.x > canvas.width - this.sizeX) {
            this.x = canvas.width - this.sizeX;
            this.speed.x *= -1;
          }
          if (this.y - this.sizeY < 0) {
            this.y = 0 + this.sizeY;
            this.speed.y *= -1;
          }
          if (this.y > canvas.height - this.sizeY) {
            this.y = canvas.height - this.sizeY;
            this.speed.y *= -1;
          }
        }
        break;
      }
    }
  }

  update(newSpeedX = 0, newSpeedY = 0, sizeX = 0, sizeY = 0) {
    if (newSpeedX || newSpeedY) {
      this.speed.x = newSpeedX;
      this.speed.y = newSpeedY;
    }
    if (sizeX || sizeY) {
      this.sizeX = sizeX;
      this.sizeY = sizeY;
    }
    this.x += this.speed.x;
    this.y += this.speed.y;
  }
}

export default Instance;
