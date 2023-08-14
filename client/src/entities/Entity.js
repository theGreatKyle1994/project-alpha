import { generateID } from "../utilities/utilityFunctions";

class Entity {
  constructor(name, health, damage) {
    this.id = generateID();
    this.name = name;
    this.health = health;
    this.maxHealth = this.health;
    this.damage = damage; // Placeholder until weapon class is created
    this.resistance = 1.0; // 1.0 mean taking full damage. 0.5 means taking half
  }

  // All logic stays inside the class when methods are called
  changeName(newName) {
    this.name = newName;
  }

  calcDefense(damIn) {
    return damIn * this.resistance;
  }

  takeDamage(damIn) {
    this.health -= this.calcDefense(damIn);
  }
}

export default Entity;
