import { generateID } from "../utilities/general/functions/utilityFunctions";

class Entity {
  constructor(name, health) {
    this.id = generateID(10, "#FF:");
    this.instance = null;
    this.name = name; // Placeholder
    this.level = 1; // Placeholder
    this.weapon = null; // Placeholder
    this.health = health;
    this.maxHealth = this.health;
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
  takeDamage({ damOut: damIn }) {
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
