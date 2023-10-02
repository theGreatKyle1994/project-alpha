import Instance from "../Instance";

class EnemyInstance extends Instance {
  constructor(id, type, options) {
    super(id, type, options);
    this.combatCollision = new Instance("", "box", {
      size: { x: this.size.x + 50, y: this.size.y + 50 },
      color: "transparent",
      useCollisionOutline: true,
    });
  }

  render(ctx, targets, canvas) {
    super.render(ctx, targets, canvas);
    (this.combatCollision.pos = { x: this.pos.x - 25, y: this.pos.y - 25 }),
      this.combatCollision.render(ctx);
  }
  // Event to trigger connection with react combat system
  checkForCombat(player, setPlayer) {
    if (this.combatCollision.verifyCollision(player.instance)) {
      console.log(`Player is in combat with: ${this.id}`);
      if (!player.isInCombat) {
        player.isInCombat = true;
        setPlayer(player.copySelf());
      }
    }
  }
}

export default EnemyInstance;
