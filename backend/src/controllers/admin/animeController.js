const Anime = require('../../models/anime');
const AnimeImage = require('../../models/animeImages');
const fs = require('fs');
const path = require('path');

class AnimeController {

  async createAnime(req, res) {
    try {
      const { name, description, category, status } = req.body;
      const images = req.files;

      const newAnime = await Anime.create({ name, description, category, status });

      if (images && images.length > 0) {
        const imagePromises = images.map(file => {
          const imageUrl = `uploads/${file.filename}`;
          return AnimeImage.create({
            filename: file.filename,
            imageUrl: imageUrl,
            anime: newAnime._id,
          });
        });

        await Promise.all(imagePromises);
      }

      res.status(201).json(newAnime);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllAnimes(req, res) {
    try {
      const animes = await Anime.find();
  
      const animesWithImages = await Promise.all(animes.map(async (anime) => {
        const images = await AnimeImage.find({ anime: anime._id });
  
        const imagesWithBase64 = await Promise.all(images.map(async (image) => {
          const fullPath = path.join(__dirname, '../../..', 'uploads', 'anime', image.filename); // Ensure correct path
  
          const imageExists = fs.existsSync(fullPath);
          
          if (imageExists) {
            const imageBase64 = fs.readFileSync(fullPath, 'base64');
            return `data:image/jpeg;base64,${imageBase64}`;
          }
          return null; 
        }));
  
        return {
          ...anime._doc, 
          images: imagesWithBase64.filter(image => image !== null)
        };
      }));
  
      res.status(200).json(animesWithImages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAnimeById(req, res) {
    try {
      const { id } = req.params;
      const anime = await Anime.findById(id).populate('category');

      if (!anime) {
        return res.status(404).json({ error: 'Anime not found' });
      }

      const images = await AnimeImage.find({ anime: anime._id });
      res.status(200).json({ anime, images });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateAnime(req, res) {
    try {
      const { id } = req.params;
      const { name, description, category, status } = req.body;
      const images = req.files;

      const anime = await Anime.findById(id);
      if (!anime) {
        return res.status(404).json({ error: 'Anime not found' });
      }

      anime.name = name;
      anime.description = description;
      anime.category = category;
      anime.status = status;
      await anime.save();

      if (images && images.length > 0) {
        const existingImages = await AnimeImage.find({ anime: anime._id });

        for (const image of existingImages) {
          const imagePath = path.join(__dirname, '../../..', 'uploads', 'anime', image.filename);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
          await AnimeImage.findByIdAndDelete(image._id);
        }

        const imagePromises = images.map(file => {
          const imageUrl = `uploads/anime/${file.filename}`;
          return AnimeImage.create({
            filename: file.filename,
            imageUrl: imageUrl,
            anime: anime._id,
          });
        });

        await Promise.all(imagePromises);
      }

      res.status(200).json(anime);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteAnime(req, res) {
    try {
      const { id } = req.params;
      const { imageName } = req.body;

      const anime = await Anime.findById(id);
      if (!anime) {
        return res.status(404).json({ error: 'Anime not found' });
      }

      if (imageName) {
        const image = await AnimeImage.findOne({ anime: anime._id, filename: imageName });
        if (image) {
          const imagePath = path.join(__dirname, '../../..', 'uploads', 'anime', image.filename);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
          await AnimeImage.findByIdAndDelete(image._id);
        } else {
          return res.status(404).json({ error: 'Image not found' });
        }
      } else {
        const images = await AnimeImage.find({ anime: anime._id });
        for (const image of images) {
          const imagePath = path.join(__dirname, '../../..', 'uploads', 'anime', image.filename);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
          await AnimeImage.findByIdAndDelete(image._id);
        }

        await Anime.findByIdAndDelete(id);
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AnimeController();
