const ProductController = require('./productController');

class ClothesController extends ProductController {
  constructor(req) {
    const requiredFields = ['color'];  

    super(req, requiredFields);
    
    this.color = req.body.color;  
  }

}

module.exports = ClothesController;
