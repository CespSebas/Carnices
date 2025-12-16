"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const maxSize = 2 * 1024 * 1024;
const __basedir = path_1.default.resolve();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__basedir, "/assets/uploads/"));
    },
    filename: (req, file, cb) => {
        const uploadPath = path_1.default.join(__basedir, "/assets/uploads/");
        const previousFileName = req.body.previousFileName;
        if (previousFileName && previousFileName !== '') {
            const previousFilePath = path_1.default.join(uploadPath, previousFileName);
            fs_1.default.unlink(previousFilePath, (err) => {
                if (err && err.code !== 'ENOENT') {
                    console.error('Error al borrar archivo anterior:', err);
                }
                else if (!err) {
                    console.log(`Archivo anterior ${previousFileName} borrado correctamente.`);
                }
            });
        }
        cb(null, 'producto_' + Date.now() + path_1.default.extname(file.originalname));
    }
});
const uploadFile = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: maxSize },
}).array('files', 5); // <- hasta 5 archivos con campo 'files'
exports.default = uploadFile;
