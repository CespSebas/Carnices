import { Router } from 'express';
import { ProductoController } from '../controller/productoController';

export class ProductoRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ProductoController();

    router.get('/', controller.get);
    router.get('/search', controller.search);
    router.get('/:id', controller.getById);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.remove);

    return router;
  }
}
