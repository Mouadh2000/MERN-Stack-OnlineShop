const ProductController = require('./productController');

class LuxeBathController extends ProductController {
  
  constructor(req, res, requiredFields = [], action = 'create') {
    // Pass the action to the parent class
    super(req, res, requiredFields, action);
  }

  async createLuxeBath() {
    await this.createProduct(); 
  }

  async updateLuxeBath(id) {
    await this.updateProduct(id);
  }

  async deleteLuxeBath(id) {
    await this.deleteProduct(id);
  }
}

module.exports = LuxeBathController;
