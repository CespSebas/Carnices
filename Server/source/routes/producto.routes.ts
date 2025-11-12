import { Router } from 'express';
import { ProductoController } from '../controller/productoController';

export class ProductoRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ProductoController();
    //localhost:3000/producto
    router.get('/', controller.get);

    //localhost:3000/producto/search?clave=valor&clave=valor
    router.get('/search', controller.search);

    //localhost:3000/producto/2
    router.get('/:id', controller.getById);

    return router;
  }
}
