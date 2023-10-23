import Entity from "../Entity";

class Enemy extends Entity {
  constructor(name = "", health = 0) {
    super(name, health);
  }
  // Event to trigger connection with react combat system
  checkForCombat(player, setEnemy) {
    // Todo: setup ability to enter and leave combat
    if (this.instance) {
      if (this.instance.combatCollision.verifyCollision(player.instance)) {
        if (!player.isInCombat) {
          player.setIsInCombat(true);
          this.setIsInCombat(true);
          setEnemy(this);
          return true;
        }
      } else if (
        !this.instance.combatCollision.verifyCollision(player.instance) &&
        player.isInCombat &&
        this.isInCombat
      ) {
        player.setIsInCombat(false);
        this.setIsInCombat(false);
        setEnemy(null);
      }
      return false;
    }
  }
  // Update any internal enemy needs on level load
  onLoad(playerPosOffset) {
    this.instance.pos.x -= playerPosOffset.x;
    this.instance.pos.y -= playerPosOffset.y;
  }
}

export default Enemy;
