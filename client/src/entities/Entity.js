class Entity {
  constructor(health, maxHealth, name) {
    this.health = health;
    this.maxHealth = maxHealth;
    this.name = name;
  }

  changeName() {
    const nameArr = [
      "Mark",
      "Kyle",
      "John",
      "Stewart",
      "James",
      "Tim",
      "Uh... Josh?",
    ];
    this.name = nameArr[Math.floor(Math.random() * nameArr.length)];
    console.log(this.name);
  }
}

export default Entity;
