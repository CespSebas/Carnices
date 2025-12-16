"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageRoutes = void 0;
const express_1 = require("express");
const imageController_1 = require("../controller/imageController");
class ImageRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new imageController_1.ImageController();
        router.post("/upload", controller.upload);
        router.get("/files", controller.getListFiles);
        router.get("/files/:name", controller.download);
        return router;
    }
}
exports.ImageRoutes = ImageRoutes;
