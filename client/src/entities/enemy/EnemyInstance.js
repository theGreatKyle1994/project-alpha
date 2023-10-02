import Instance from "../Instance";

class EnemyInstance extends Instance {
  constructor(id, type, options) {
    super(id, type, options);
    // Setting up collision around the enemy boxes
    this.combatCollision = new Instance("", "box", {
      size: { x: this.size.x + 50, y: this.size.y + 50 },
      color: "transparent",
      useCollisionOutline: true,
    });
  }
  // render override to handle combat collision
  render(ctx, targets, canvas) {
    super.render(ctx, targets, canvas);
    this.combatCollision.pos = { x: this.pos.x - 25, y: this.pos.y - 25 };
    this.combatCollision.render(ctx);
  }
  // Event to trigger connection with react combat system
  checkForCombat(player, setPlayer) {
    // Todo: setup ability to enter and leave combat
    if (this.combatCollision.verifyCollision(player.instance)) {
      if (!player.isInCombat) {
        player.isInCombat = true;
        console.log(`Player is in combat with: ${this.id}`);
        setPlayer(player.copySelf());
      }
    }
  }
}

export default EnemyInstance;
