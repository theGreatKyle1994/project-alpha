import { useRef, useEffect } from "react";

class Square {
  constructor() {
    this.sizeX = 50;
    this.sizeY = 50;
    this.x = 0;
    this.y = 0;
    this.speed = 3;
    this.sprintSpeed = this.speed + 2;
    this.dx = 0;
    this.dy = 0;
    this.keyObj = { w: false, a: false, s: false, d: false, alt: false };
  }
  drawPlayer(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.sizeX, this.sizeY);
    ctx.fillStyle = "red";
    ctx.fill();
  }
  newPos(canvas) {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x < 0) this.x = 0;
    if (this.x > canvas.width - this.sizeX) this.x = canvas.width - this.sizeX;
    if (this.y < 0) this.y = 0;
    if (this.y > canvas.height - this.sizeY)
      this.y = canvas.height - this.sizeY;
  }
  checkMovement(e) {
    if (e.type == "keydown") this.keyObj[e.key.toLowerCase()] = true;
    if (e.type == "keyup") this.keyObj[e.key.toLowerCase()] = false;

    if (this.keyObj.alt) {
      this.speed = this.sprintSpeed;
    } else if (!this.keyObj.alt) {
      this.speed = 3;
    }

    if (this.keyObj.w) {
      this.dy = -this.speed;
    } else if (this.keyObj.s) {
      this.dy = this.speed;
    } else {
      this.dy = 0;
    }

    if (this.keyObj.a) {
      this.dx = -this.speed;
    } else if (this.keyObj.d) {
      this.dx = this.speed;
    } else {
      this.dx = 0;
    }

    if (this.dx && this.dy) {
      this.dx *= Math.SQRT1_2;
      this.dy *= Math.SQRT1_2;
    }
  }
}

const square = new Square();

const CanvasTesting = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    let frameId = undefined;
    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      square.drawPlayer(ctx);
      square.newPos(canvas);
      frameId = requestAnimationFrame(update);
    }
    update();
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      square.checkMovement(e);
    });
    document.addEventListener("keyup", (e) => {
      e.preventDefault();
      square.checkMovement(e);
    });
    return () => {
      document.removeEventListener("keydown");
      document.removeEventListener("keyup");
    };
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Canvas Test</h1>
      <canvas
        ref={canvasRef}
        style={{
          backgroundColor: "lightgrey",
          borderRadius: "10px",
          border: "1px solid black",
        }}
      />
    </div>
  );
};

export default CanvasTesting;
