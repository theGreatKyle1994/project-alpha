class Entity {
  constructor(health, maxHealth, name) {
    this.health = health;
    this.maxHealth = maxHealth;
    this.name = name;
  }

  // All logic stays inside the class when methods are called
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
    console.log("From class: " + this.name);
  }
}

export default Entity;
