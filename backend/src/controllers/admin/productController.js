const Product = require('../../models/product');
const ProductImage = require('../../models/productImages');
const Anime = require('../../models/anime');
const AnimeImage = require('../../models/animeImages');
const fs = require('fs');
const path = require('path');

class ProductController {
    constructor(req, res, requiredFields = [], action = 'create') {
        this.res = res;
        this.Product = Product;
        this.ProductImage = ProductImage;
        
        // Define required fields for both create and update actions
        this.requiredFields = ['name', 'description', 'category', 'status', 'price', 'discount', 'stock_quantity', 'size', ...requiredFields];

        // Fields sent in request body
        this.name = req.body.name;
        this.description = req.body.description;
        this.category = req.body.category;
        this.status = req.body.status;
        this.price = req.body.price;
        this.discount = req.body.discount;
        this.stock_quantity = req.body.stock_quantity;
        this.size = req.body.size;  
        this.colors = req.body.colors; 
        this.images = req.files;

        if (action === 'create') {
            this.validateRequiredFields();
        } else if (action === 'update') {
            this.validateRequiredFieldsForUpdate();
        }
    }

    validateRequiredFields() {
        for (const field of this.requiredFields) {
            if (!this[field]) {
                throw new Error(`${field} is required`);
            }
        }
    }

    validateRequiredFieldsForUpdate() {
        const fieldsToValidate = ['name', 'description', 'category', 'status', 'price', 'discount', 'stock_quantity', 'size'];

        for (const field of fieldsToValidate) {
            if (this[field] === undefined || this[field] === null || this[field] === '') {
                throw new Error(`${field} is required`);
            }
        }
    }

    // Create a new product
    async createProduct() {
        try {
            let colorArray = [];

            // If colors are provided as a stringified array (e.g., '["#ffffff","#9b9b9b","#4a4a4a"]')
            if (Array.isArray(this.colors)) {
                colorArray = this.colors; // If it's already an array, use it directly
            } else if (typeof this.colors === 'string') {
                // If it's a stringified array, parse it into an actual array
                try {
                    colorArray = JSON.parse(this.colors);
                } catch (error) {
                    // If parsing fails, treat it as an empty array or handle it as per your logic
                    colorArray = [];
                }
            }
            const newProduct = await this.Product.create({
                name: this.name,
                description: this.description,
                category: this.category,
                status: this.status,
                price: this.price,
                discount: this.discount,
                stock_quantity: this.stock_quantity,
                size: this.size,
                colors: colorArray,
            });

            if (this.images && this.images.length > 0) {
                const imagePromises = this.images.map(file => {
                    const imageUrl = `uploads/Product/${file.filename}`;
                    return this.ProductImage.create({
                        filename: file.filename,
                        imageUrl: imageUrl,
                        product: newProduct._id,
                    });
                });

                await Promise.all(imagePromises);
            }

            this.res.status(201).json(newProduct);
        } catch (error) {
            this.res.status(500).json({ error: error.message });
        }
    }

    // Get all products along with images
    async getAllProducts() {
        try {
            const products = await this.Product.find();
            const productsWithImages = await Promise.all(
                products.map(async (product) => {
                    const images = await this.ProductImage.find({ product: product._id });

                    const imagesWithBase64 = await Promise.all(images.map(async (image) => {
                        const fullPath = path.join(__dirname, '../../..', 'uploads', 'Product', image.filename);
                        if (fs.existsSync(fullPath)) {
                            const imageBase64 = fs.readFileSync(fullPath, 'base64');
                            return `data:image/jpeg;base64,${imageBase64}`;
                        }
                        return null;
                    }));

                    return {
                        ...product._doc,
                        images: imagesWithBase64.filter(image => image !== null),
                    };
                })
            );

            this.res.status(200).json(productsWithImages);
        } catch (error) {
            this.res.status(500).json({ error: error.message });
        }
    }

    async getProductsByCategory(category) {
        try {
            const products = await this.Product.find({ category });

            if (products.length === 0) {
                return this.res.status(404).json({ error: 'No products found in this category' });
            }

            const productsWithImages = await Promise.all(
                products.map(async (product) => {
                    const images = await this.ProductImage.find({ product: product._id });

                    const imagesWithBase64 = await Promise.all(images.map(async (image) => {
                        const fullPath = path.join(__dirname, '../../..', 'uploads', 'Product', image.filename);
                        if (fs.existsSync(fullPath)) {
                            const imageBase64 = fs.readFileSync(fullPath, 'base64');
                            return `data:image/jpeg;base64,${imageBase64}`;
                        }
                        return null;
                    }));

                    return {
                        ...product._doc,
                        images: imagesWithBase64.filter(image => image !== null),
                    };
                })
            );

            this.res.status(200).json(productsWithImages);
        } catch (error) {
            this.res.status(500).json({ error: error.message });
        }
    }

    async getProductById(id) {
        try {
            const product = await this.Product.findById(id);
    
            if (!product) {
                return this.res.status(404).json({ error: `Product not found` });
            }
    
            const images = await this.ProductImage.find({ product: product._id });
    
            const imagesWithBase64 = await Promise.all(images.map(async (image) => {
                const fullPath = path.join(__dirname, '../../..', 'uploads', 'Product', image.filename);
                if (fs.existsSync(fullPath)) {
                    const imageBase64 = fs.readFileSync(fullPath, 'base64');
                    return `data:image/jpeg;base64,${imageBase64}`;
                }
                return null;
            }));
    
            this.res.status(200).json({
                ...product._doc,
                images: imagesWithBase64.filter(image => image !== null),
            });
        } catch (error) {
            this.res.status(500).json({ error: error.message });
        }
    }

    async updateProduct(id) {
        try {

            let colorArray = [];

            if (Array.isArray(this.colors)) {
                colorArray = this.colors; // If it's already an array, use it directly
            } else if (typeof this.colors === 'string') {
                // If it's a stringified array, parse it into an actual array
                try {
                    colorArray = JSON.parse(this.colors);
                } catch (error) {
                    // If parsing fails, treat it as an empty array or handle it as per your logic
                    colorArray = [];
                }
            }
            const product = await this.Product.findById(id);

            if (!product) {
                return this.res.status(404).json({ error: `Product not found` });
            }

            product.name = this.name || product.name;
            product.description = this.description || product.description;
            product.category = this.category || product.category;
            product.status = this.status || product.status;
            product.price = this.price || product.price;
            product.discount = this.discount || product.discount;
            product.stock_quantity = this.stock_quantity || product.stock_quantity;
            product.size = this.size || product.size;
            product.colors = this.colors || colorArray;

            await product.save();

            if (this.images && this.images.length > 0) {
                // Delete existing images
                const existingImages = await this.ProductImage.find({ product: product._id });

                for (const image of existingImages) {
                    const imagePath = path.join(__dirname, '../../..', 'uploads', 'Product', image.filename);
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
                    await this.ProductImage.findByIdAndDelete(image._id);
                }

                // Add new images
                const imagePromises = this.images.map(file => {
                    const imageUrl = `uploads/Product/${file.filename}`;
                    return this.ProductImage.create({
                        filename: file.filename,
                        imageUrl: imageUrl,
                        product: product._id,
                    });
                });

                await Promise.all(imagePromises);
            }

            this.res.status(200).json(product);
        } catch (error) {
            this.res.status(500).json({ error: error.message });
        }
    }

    // Delete a product
    async deleteProduct(id) {
        try {
            // Fetch the product by ID
            const product = await this.Product.findById(id);
            if (!product) {
                return this.res.status(404).json({ error: `Product not found` });
            }
    
            // Delete associated images (if needed)
            const images = await this.ProductImage.find({ product: product._id });
            for (const image of images) {
                const imagePath = path.join(__dirname, '../../..', 'uploads', 'Product', image.filename);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath); // Remove file from the filesystem
                }
                await this.ProductImage.findByIdAndDelete(image._id); // Remove image record
            }
    
            // Delete the product
            await this.Product.findByIdAndDelete(id);
    
            // Return success response
            this.res.status(204).send();
        } catch (error) {
            this.res.status(500).json({ error: error.message });
        }
    }

    async checkStock(id) {
        try {
            const product = await this.Product.findById(id);
    
            if (!product) {
                return this.res.status(404).json({ error: `Product not found` });
            }
    
            if (product.stock_quantity > 0) {
                return this.res.status(200).json({ inStock: true });
            } else {
                return this.res.status(200).json({ inStock: false });
            }
        } catch (error) {
            this.res.status(500).json({ error: error.message });
        }
    }
    
}

module.exports = ProductController;
