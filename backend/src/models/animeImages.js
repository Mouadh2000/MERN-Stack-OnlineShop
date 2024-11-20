const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animeImageSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  anime: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Anime',
    required: true,
  },
}, {
  timestamps: true,
});

const AnimeImage = mongoose.model('AnimeImage', animeImageSchema);

module.exports = AnimeImage;
