const ProductController = require('./productController');
const Anime = require('../../models/anime');
const { BaseProduct } = require('../../decorators/product');
const { AnimeImageDecorator } = require('../../decorators/productDecorator');
const Product = require('../../models/product');

class ClothesController extends ProductController {
  constructor(req, res, action = 'create') {

    const requiredFields = action === 'createCustomizedProduct' ? [] : ['colors'];

    super(req, res, requiredFields, action);
    this.req = req;
    this.res = res;
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

  async createCustomizedProduct() {
    try {
      const { name, addAnimeImage, animeId } = this.req.body;
  
      let product = await Product.findOne({ name });
  
      if (!product) throw new Error('Product not found');
  
      let baseProduct = new BaseProduct(product);
  
      if (addAnimeImage && animeId) {
        const anime = await Anime.findById(animeId);
        if (!anime) throw new Error('Anime image not found');
  
        baseProduct = new AnimeImageDecorator(baseProduct, anime.name);
      }
  
      this.res.status(201).json({
        description: baseProduct.getDescription(),
        price: baseProduct.getPrice(),
      });
    } catch (error) {
      this.res.status(500).json({ error: error.message });
    }
  }
  
  

}

module.exports = ClothesController;
