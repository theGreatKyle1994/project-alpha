export const updateInstanceLocation = (player, map, enemies) => {
  const { x: playerSpeedX, y: playerSpeedY } = player.speed;
  if (!player.isColliding) {
    for (let tile of map) {
      tile.pos.x -= playerSpeedX;
      tile.pos.y -= playerSpeedY;
    }
    for (let enemy of enemies) {
      enemy.instance.pos.x -= playerSpeedX;
      enemy.instance.pos.y -= playerSpeedY;
    }
  }
};
