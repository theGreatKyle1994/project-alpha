import { generateID } from "../utilities/general/functions/utilityFunctions";

class Entity {
  constructor(name, health, damage) {
    this.id = generateID(10, "#FF:");
    this.instance = null;
    this.name = name;
    this.level = 1; // Placeholder until persistant data is used
    this.health = health;
    this.maxHealth = this.health;
    this.damage = damage; // Placeholder until weapon class is created
    this.resistance = 1.0; // 1.0 mean taking full damage. 0.5 means taking half
    this.isDead = false;
    this.isInCombat = false;
  }
  // Base method to change entity name
  changeName(newName) {
    this.name = newName;
  }
  // Internal method for defense calculations
  calcDefense(damIn) {
    return damIn * this.resistance;
  }
  // Base method to take damage
  takeDamage(damIn) {
    if (this.health > 0) {
      this.health -= this.calcDefense(damIn);
    }
    if (this.health <= 0) {
      this.isDead = true;
      this.health = 0;
    }
  }
  // Base method used to heal the entity
  takeHeal(healIn) {
    if (this.isDead) {
      this.isDead = false;
    }
    if (this.health < this.maxHealth) {
      this.health += healIn;
      if (this.health > this.maxHealth) {
        this.health = this.maxHealth;
      }
    }
  }
  // Base method for setting the entity in combat
  setIsInCombat(isCombat) {
    this.isInCombat = isCombat;
  }
  // Event to trigger connection with react combat system
  checkForCombat(entity, setCombatEnemy) {
    // Todo: setup ability to enter and leave combat
    if (this.instance) {
      if (this.instance.combatCollision.verifyCollision(entity.instance)) {
        if (!entity.isInCombat) {
          entity.setIsInCombat(true);
          this.setIsInCombat(true);
          setCombatEnemy(this);
          return true;
        }
      } else if (
        !this.instance.combatCollision.verifyCollision(entity.instance) &&
        entity.isInCombat &&
        this.isInCombat
      ) {
        entity.setIsInCombat(false);
        this.setIsInCombat(false);
        setCombatEnemy(null);
      }
      return false;
    }
  }
  // Setting of the canvas instance
  setInstance(newInstance) {
    this.instance = newInstance;
  }
  // This is required for the game to function and to keep everything in
  // sync with react state | DO NOT REMOVE
  copySelf() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
}

export default Entity;
