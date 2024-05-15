
const multer = require('multer');

// MULTER
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const uniqueFileName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueFileName);
    }
  });
  
  const upload = multer({
    storage: storage,
  });
  
  const multerMiddleware = upload.single('file');