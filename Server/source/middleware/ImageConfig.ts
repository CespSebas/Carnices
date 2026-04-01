import multer from 'multer';
import path from 'path';
import fs from 'fs';

const maxSize = 2 * 1024 * 1024;
const __basedir = path.resolve();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__basedir, "/assets/uploads/"));
  },
  filename: (req, file, cb) => {
    const uploadPath = path.join(__basedir, "/assets/uploads/");
    const previousFileName = req.body.previousFileName;

    if (previousFileName && previousFileName !== '') {
      const previousFilePath = path.join(uploadPath, previousFileName);
      fs.unlink(previousFilePath, (err) => {
        if (err && err.code !== 'ENOENT') {
          console.error('Error al borrar archivo anterior:', err);
        } else if (!err) {
          console.log(`Archivo anterior ${previousFileName} borrado correctamente.`);
        }
      });
    }

    cb(null, 'producto_' + Date.now() + path.extname(file.originalname));
  }
});

const uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).array('files', 5); // <- hasta 5 archivos con campo 'files'


export default uploadFile;
