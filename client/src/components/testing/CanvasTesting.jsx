import { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";

// This class represents a square instance in the canvas
class Square {
  constructor() {
    // width and height
    this.sizeX = 50;
    this.sizeY = 50;
    // shape position on the canvas
    this.x = 0;
    this.y = 0;
    // base position change per frame
    this.speed = 3;
    this.sprintSpeed = this.speed + 2;
    // speed change per direction -+(x or y)
    this.dx = 0;
    this.dy = 0;
    // keystroke object for tracking what keys are pressed
    this.keyObj = { w: false, a: false, s: false, d: false, alt: false };
  }
  // method for drawing a single instance of this square (called per frame)
  drawSquare(ctx) {
    // prepare for drawing shape on canvas
    ctx.beginPath();
    // draw rect on canvas (x position, y position, scale x, scale y)
    ctx.rect(this.x, this.y, this.sizeX, this.sizeY);
    // color to fill in the shape with
    ctx.fillStyle = "red";
    // execute fill with previous setup methods
    ctx.fill();
  }
  // method used for calculating new pos (called per frame)
  newPos(canvas) {
    // calculate new position based on shapes dx and dy
    this.x += this.dx;
    this.y += this.dy;
    // basic canvas boundary collision detection
    // X-Axis collision (shape size considered)
    if (this.x < 0) this.x = 0;
    if (this.x > canvas.width - this.sizeX) this.x = canvas.width - this.sizeX;
    // Y-Axis collision (shape size considered)
    if (this.y < 0) this.y = 0;
    if (this.y > canvas.height - this.sizeY)
      this.y = canvas.height - this.sizeY;
  }
  // method used to change which direction the shape is going based on key input
  checkMovement(e) {
    // modification of keyObj to input booleans based on key press
    // depending on event
    if (e.type == "keydown") this.keyObj[e.key.toLowerCase()] = true;
    if (e.type == "keyup") this.keyObj[e.key.toLowerCase()] = false;
    // when alt is held, we move faster (sprinting)
    if (this.keyObj.alt) {
      this.speed = this.sprintSpeed;
      // otherwise we reset the speed to default
    } else if (!this.keyObj.alt) {
      this.speed = 3;
    }
    // canvas has upside down coords 0,0 is top left
    // W / S Key (up)
    if (this.keyObj.w) {
      this.dy = -this.speed;
    } else if (this.keyObj.s) {
      this.dy = this.speed;
    } else {
      this.dy = 0;
    }
    // A / D Key (left)
    if (this.keyObj.a) {
      this.dx = -this.speed;
    } else if (this.keyObj.d) {
      this.dx = this.speed;
    } else {
      this.dx = 0;
    }
    // diagonal movement speed adjustment, if both x and y axis are used, we
    // apply the product of the square root of both directions by 0.5 sqrt(0.5) per axis
    // if you comment this out you will find diagonal movement is too fast
    if (this.dx && this.dy) {
      this.dx *= Math.SQRT1_2;
      this.dy *= Math.SQRT1_2;
    }
  }
}

// create new instance of a square object
const square = new Square();

const CanvasTesting = () => {
  // setting up state to watch both mouse movement and context menu visable state
  const [contextMenu, setContextMenu] = useState(false);
  const [mousePos, setMousePos] = useState({ mouseX: 0, mouseY: 0 });
  // a direct reference is needed to access canvas, we use useRef()
  const canvasRef = useRef(null);

  // all the magic happens in this useEffect()
  useEffect(() => {
    // extraction of the ref for use
    const canvas = canvasRef.current;
    // setting the canvas width and height (only on mount)
    canvas.width = 800;
    canvas.height = 800;
    // spawning the square in the dead center of the canvas (shape size considered)
    square.x = canvas.width / 2 - square.sizeX / 2;
    square.y = canvas.height / 2 - square.sizeY / 2;
    // assigning what type of canvas to use and extracting the context, in this case: 2d
    const ctx = canvas.getContext("2d");
    // preparing to track the current frame for useEffect cleanup
    let frameId = undefined;
    // tracking of mouse movement within the canvas for context menu
    canvas.addEventListener("mousemove", (e) => {
      e.preventDefault();
      // setting mouse position to canvas bounds
      setMousePos({ mouseX: e.offsetX, mouseY: e.offsetY });
    });
    // Right click listener for context menu
    canvas.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      setContextMenu((prevMenuState) => !prevMenuState);
    });
    // the main update function used to call any number of
    // functions per frame to update the canvas sprites
    const update = () => {
      // clearing the entire board every time a frame is rendered
      // comment this out for a make-shift drawing program!
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // our square class drawing method is called, we pass in our ctx for method use
      square.drawSquare(ctx);
      // checking for position changes if valid keys are pressed, we pass in our canvas
      // for direct use of our collision detection system
      square.newPos(canvas);
      // assigning our frame id and start the frame process
      // this runs natively at 60fps which means everything inside update() will
      // run 60 times a second. this is intensional.
      // we must pass in the same function name it's declared inside to create the recurive effect
      frameId = requestAnimationFrame(update);
    };
    // the initial call on component render to update to start the frame loop
    update();
    // our cleanup function to stop our 60fps update() function. without this, react would crash
    // since we would have 60 requestAnimationFrame loops running per second.
    // this would turn quadratically laggy very quickly. this return cleanup is REQUIRED.
    return () => {
      // we pass in the frame id to referense which animation frame to stop
      cancelAnimationFrame(frameId);
      // removal of mouse listener and context menu on component removal
      document.removeEventListener("mousemove");
      document.removeEventListener("contextmenu");
    };
  }, []);

  // these are our keyboard event listeners, they are used to listen in for any keyboard events
  // for both key down and on release, even if it's not relevant to our movement system directly.
  useEffect(() => {
    // Key down listener
    document.addEventListener("keydown", (e) => {
      // this is needed to we don't activate any browser hotkeys, it's used in both listeners
      e.preventDefault();
      // on key press, we send the event into our movement function on the class
      square.checkMovement(e);
    });
    // Key up listener
    document.addEventListener("keyup", (e) => {
      e.preventDefault();
      square.checkMovement(e);
    });
    // same story as the above useEffect, a cleanup function to remove these listeners and make sure
    // only 1 of each or none is ever active at a time
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
      {contextMenu && (
        <Draggable
          // setting up the context menu position on spawn to be within the canvas itself,
          // offset to right and down a little instead of spawning on the mouse itself
          defaultPosition={{
            x: mousePos.mouseX - canvasRef?.current.width / 2 + 75,
            y: mousePos.mouseY - canvasRef?.current.height / 2 + 25,
          }}
        >
          <div
            style={{
              width: "150px",
              position: "absolute",
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "10px",
              border: "1px solid black",
            }}
          >
            <button
              // removal of context menu with the X button
              onClick={() => setContextMenu(false)}
              style={{ position: "relative", float: "right", padding: "3px" }}
            >
              X
            </button>
            <h4>Context Menu</h4>
            <select>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
              <option>Option 4</option>
              <option>Option 5</option>
              <option>Option 6</option>
              <option>Option 7</option>
            </select>
          </div>
        </Draggable>
      )}
      <h1>Canvas Test</h1>
      <canvas
        // passing in our ref defined at the top for access to the elements methods
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
