"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ImageConfig_1 = __importDefault(require("../middleware/ImageConfig"));
const __basedir = path_1.default.resolve();
const baseUrl = "http://localhost:3000/";
const directoryPath = path_1.default.join(__basedir, "/assets/uploads/");
class ImageController {
    constructor() {
        this.upload = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Subir los archivos
                yield new Promise((resolve, reject) => {
                    (0, ImageConfig_1.default)(request, response, (err) => {
                        if (err)
                            reject(err);
                        else
                            resolve();
                    });
                });
                if (!request.files || request.files.length === 0) {
                    return response.status(400).send({ message: "¡Por favor sube un archivo!" });
                }
                // Archivo anterior (si aplica)
                const previousFileName = request.body.previousFileName;
                const directoryPath = path_1.default.join(path_1.default.resolve(), "/assets/uploads/");
                if (previousFileName) {
                    const previousFilePath = path_1.default.join(directoryPath, previousFileName);
                    if (fs_1.default.existsSync(previousFilePath)) {
                        fs_1.default.unlinkSync(previousFilePath);
                        console.log(`Archivo eliminado: ${previousFilePath}`);
                    }
                }
                response.status(200).send({
                    message: "Archivo(s) subido(s) exitosamente",
                    fileNames: request.files.map(f => f.filename),
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getListFiles = (request, response, next) => {
            try {
                fs_1.default.readdir(directoryPath, (err, files) => {
                    if (err) {
                        response.status(500).send({
                            message: "¡No se pueden escanear los archivos!",
                        });
                        return;
                    }
                    const fileInfos = files.map((file) => ({
                        name: file,
                        url: baseUrl + file,
                    }));
                    response.status(200).send(fileInfos);
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.download = (request, response, next) => {
            try {
                const fileName = request.params.name;
                const directoryPath = path_1.default.join(__basedir, "/assets/uploads//");
                response.download(path_1.default.join(directoryPath, fileName), fileName, (err) => {
                    if (err) {
                        response.status(500).send({
                            message: "No se pudo descargar el archivo. " + err,
                        });
                    }
                });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.ImageController = ImageController;
