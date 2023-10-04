import Entity from "../Entity";

class Enemy extends Entity {
  constructor(name, health, damage) {
    super(name, health, damage);
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
}

export default Enemy;
