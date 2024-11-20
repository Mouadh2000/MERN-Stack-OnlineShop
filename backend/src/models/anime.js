const mongoose = require('mongoose');
const Category = require('./category');

const animeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Inactive',
  },
  category: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

animeSchema.pre('save', async function (next) {
  if (this.category) {
    try {
      const category = await Category.findById(this.category);
      if (!category) {
        return next(new Error('Category not found'));
      }
      if (!category.anime) {
        return next(new Error('Category must have anime set to true'));
      }
    } catch (error) {
      return next(new Error('Error checking category: ' + error.message));
    }
  }
  
  this.updated_at = Date.now();
  next();
});

const Anime = mongoose.model('Anime', animeSchema);

module.exports = Anime;
