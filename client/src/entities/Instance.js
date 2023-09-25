class Instance {
  constructor(
    size = { x: 10, y: 10 },
    pos = { x: 0, y: 0 },
    speed = 3,
    spriteSrc = ""
  ) {
    this.sizeX = size.x;
    this.sizeY = size.y;
    this.x = pos.x;
    this.y = pos.y;
    this.dx = 0;
    this.dy = 0;
    this.speed = speed;
    this.spriteSrc = spriteSrc;
  }

  drawRect(ctx, color = "black", outline = false) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.sizeX, this.sizeY);
    ctx.fillStyle = color;
    ctx.fill();
    if (outline) ctx.stroke();
  }

  drawCircle(ctx, color = "black", outline = false) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.sizeX, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    if (outline) ctx.stroke;
  }

  drawImage(ctx) {
    const img = new Image(this.sizeX, this.sizeY);
    img.src = this.spriteSrc;
    ctx.drawImage(img, this.x, this.y, this.sizeX, this.sizeY);
  }

  newPos(speedX = 0, speedY = 0, sizeX = 0, sizeY = 0) {
    this.dx = speedX || this.speed;
    this.dy = speedY || this.speed;
    this.x += this.dx;
    this.y += this.dy;
    this.sizeX = sizeX || this.sizeX;
    this.sizeY = sizeY || this.sizeY;
  }
}

export default Instance;
