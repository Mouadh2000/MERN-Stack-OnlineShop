const ProductController = require('./productController');

class ClothesController extends ProductController {
  constructor(req, res, action = 'create') {
    const requiredFields = ['colors'];  

    super(req, res, requiredFields, action);
    
    this.colors = req.body.colors;  
  }

  async createClothesProduct() {
    await this.createProduct(); 
  }

  async updateClothesProduct(id) {
    await this.updateProduct(id);
  }

  async deleteClothesProduct(id) {
    await this.deleteProduct(id);
  }

}

module.exports = ClothesController;
