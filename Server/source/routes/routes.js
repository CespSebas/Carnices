"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const producto_routes_1 = require("./producto.routes");
const resenna_routes_1 = require("./resenna.routes");
const pedido_routes_1 = require("./pedido.routes");
const imagen_routes_1 = require("./imagen.routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        // localhost:3000/producto/
        router.use('/producto', producto_routes_1.ProductoRoutes.routes);
        router.use('/imagen', imagen_routes_1.ImageRoutes.routes);
        router.use('/resenna', resenna_routes_1.ResennaRoutes.routes);
        router.use('/pedido', pedido_routes_1.PedidoRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
