"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoRoutes = void 0;
const express_1 = require("express");
const productoController_1 = require("../controller/productoController");
class ProductoRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new productoController_1.ProductoController();
        //localhost:3000/producto
        router.get('/', controller.get);
        //localhost:3000/producto/search?clave=valor&clave=valor
        router.get('/search', controller.search);
        //localhost:3000/producto/2
        router.get('/:id', controller.getById);
        return router;
    }
}
exports.ProductoRoutes = ProductoRoutes;
