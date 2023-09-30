import Instance from "../Instance";
import generateMap from "../../utilities/map/map-engine";

class GameMap {
  constructor(mapWidth = 0, mapHeight = 0) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.mapLayout = [];
    this.walls = [];
    this.openSpace = [];
    this.size = 50;
  }

  // This method is called once whenever we need to generate a map
  createMap() {
    // Clears out previous map
    this.mapLayout = [];
    // Placeholder for testing, internal integration needed
    const map = generateMap(this.mapHeight, this.mapWidth);
    // Map creation loop using instances
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        // Check for a wall
        const isWall = map[i][j] == 2 ? false : true;
        // Create tile instance
        const currentTile = new Instance("box", {
          size: { x: this.size, y: this.size },
          pos: { x: this.size * j, y: this.size * i },
          color: isWall ? "red" : "green",
          useCollision: isWall,
          isStatic: true,
        });
        // Capture walls for collision algos
        if (isWall) this.walls.push(currentTile);
        else this.openSpace.push(currentTile);
        // Assing tile to map layout for rendering
        this.mapLayout.push(currentTile);
      }
    }
  }

  // Map render method, this is called directly from the Engine
  renderMap(ctx) {
    // Calling render on each tile per frame
    for (let tile of this.mapLayout) tile.render(ctx);
  }
}

export default GameMap;
