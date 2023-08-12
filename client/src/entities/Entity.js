class Entity {
  constructor(health, maxHealth, name) {
    this.health = health;
    this.maxHealth = maxHealth;
    this.name = name;
  }

  changeName(newName) {
    this.name = newName;
  }
}

export default Entity;
