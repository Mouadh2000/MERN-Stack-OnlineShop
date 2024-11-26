class BaseProduct {
  constructor(product) {
    this.product = product;
  }

  getDescription() {
    return this.product.description;  
  }

  getPrice() {
    return this.product.price; 
  }
}

module.exports = { BaseProduct };
