import { generateID } from "../utilities/general/functions/utilityFunctions";

class Entity {
  constructor(name, health, damage) {
    this.id = generateID(10, "#FF:");
    this.name = name;
    this.health = health;
    this.maxHealth = this.health;
    this.damage = damage; // Placeholder until weapon class is created
    this.resistance = 1.0; // 1.0 mean taking full damage. 0.5 means taking half
    this.isDead = false;
  }

  // All logic stays inside the class when methods are called
  changeName(newName) {
    this.name = newName;
  }

  calcDefense(damIn) {
    return damIn * this.resistance;
  }

  // Example of internal methods that don't need to be projected in the hook
  takeDamage(damIn) {
    if (this.health > 0) {
      this.health -= this.calcDefense(damIn);
    }
    if (this.health <= 0) {
      this.isDead = true;
      this.health = 0;
    }
  }

  takeHeal(healIn) {
    // This for debug purposes.
    // In the future this will be handled by revive potions/trickets
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
}

export default Entity;
