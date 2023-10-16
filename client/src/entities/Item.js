class Item {
  constructor(
    creatorObj = {
      name: "",
      description: "",
      image: "",
    }
  ) {
    this.name = creatorObj.name || "";
    this.description = creatorObj.description || "";
    this.image = creatorObj.image || "";
  }
  // todo
}

export default Item;
