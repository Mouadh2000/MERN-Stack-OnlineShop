const Category = require('../../models/category');

class CategoryController {

    async createCategory(req, res) {
        try {
        const { name, description, status, anime } = req.body;

        const newCategory = new Category({
            name,
            description,
            status,
            anime,
        });

        const savedCategory = await newCategory.save();
        return res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: savedCategory,
        });
        } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error creating category',
            error: error.message,
        });
        }
    }

    async getAllCategories(req, res) {
        try {
        const categories = await Category.find({});
        return res.status(200).json({
            success: true,
            message: 'Categories fetched successfully',
            data: categories,
        });
        } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching categories',
            error: error.message,
        });
        }
    }

    async getCategoryById(req, res) {
        try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({
            success: false,
            message: 'Category not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Category fetched successfully',
            data: category,
        });
        } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching category',
            error: error.message,
        });
        }
    }

    async updateCategory(req, res) {
        try {
        const categoryId = req.params.id;
        const { name, description, status, anime } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { name, description, status, anime, updated_at: Date.now() },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({
            success: false,
            message: 'Category not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            data: updatedCategory,
        });
        } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error updating category',
            error: error.message,
        });
        }
    }

    async deleteCategory(req, res) {
        try {
        const categoryId = req.params.id;

        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            return res.status(404).json({
            success: false,
            message: 'Category not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Category deleted successfully',
            data: deletedCategory,
        });
        } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error deleting category',
            error: error.message,
        });
        }
    }
}

module.exports = new CategoryController();
