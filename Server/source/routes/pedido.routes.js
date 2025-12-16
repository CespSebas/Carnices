"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoRoutes = void 0;
const express_1 = require("express");
const pedidoController_1 = require("../controller/pedidoController");
class PedidoRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new pedidoController_1.PedidoController();
        //localhost:3000/producto
        router.get('/', controller.get);
        //localhost:3000/producto/search?clave=valor&clave=valor
        router.get('/search', controller.search);
        //localhost:3000/producto/2
        router.get('/:id', controller.getById);
        return router;
    }
}
exports.PedidoRoutes = PedidoRoutes;
