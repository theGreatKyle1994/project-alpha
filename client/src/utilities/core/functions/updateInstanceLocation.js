export const updateInstanceLocation = (player, map, enemies) => {
  const playerSpeed = player.speed;
  for (let tile of map) {
    tile.pos.x -= playerSpeed.x;
    tile.pos.y -= playerSpeed.y;
  }
  for (let enemy of enemies) {
    enemy.instance.pos.x -= playerSpeed.x;
    enemy.instance.pos.y -= playerSpeed.y;
  }
};
