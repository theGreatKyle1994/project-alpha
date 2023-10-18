class Item {
  constructor(
    creatorObj = {
      itemName: "",
      description: "",
      spriteSrc: "",
    }
  ) {
    this.itemName = creatorObj.itemName || "";
    this.description = creatorObj.description || "";
    this.spriteSrc = creatorObj.spriteSrc || "";
  }
  // todo
}

export default Item;
