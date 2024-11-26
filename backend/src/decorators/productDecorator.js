class ProductDecorator {
    constructor(product) {
      this.product = product;
    }
  
    getDescription() {
      return this.product.getDescription();
    }
  
    getPrice() {
      return this.product.getPrice();
    }
}
  
class AnimeImageDecorator extends ProductDecorator {
    constructor(product, animeName) {
      super(product);
      this.animeName = animeName;
    }
  
    getDescription() {
      return `${this.product.getDescription()} with Anime Image of ${this.animeName}`;
    }
  
    getPrice() {
      return this.product.getPrice() + 10;
    }
}
  
module.exports = { ProductDecorator, AnimeImageDecorator };
  