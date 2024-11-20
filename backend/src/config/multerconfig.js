const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadType = req.body.uploadType; 
        
        let uploadPath = '';
        if (uploadType === 'anime') {
            uploadPath = path.join(__dirname, '../../uploads/anime');
        } else if (uploadType === 'Product') {
            uploadPath = path.join(__dirname, '../../uploads/Product'); 
        } else {
            return cb(new Error('Invalid upload type'), false);
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
