import Draggable from "react-draggable";

const InventoryCore = () => {
  return (
    <Draggable
      defaultPosition={{
        x: 0,
        y: 0,
      }}
      bounds="canvas"
      handle="#inventory-header"
    >
      <div
        id="inventory-header"
        style={{
          position: "absolute",
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "10px",
          border: "1px solid black",
          zIndex: 100,
        }}
      >
        <h1>INVENTORY TEST</h1>
      </div>
    </Draggable>
  );
};

export default InventoryCore;
