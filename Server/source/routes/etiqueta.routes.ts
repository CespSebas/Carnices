import { Router } from 'express';
import { EtiquetaController } from '../controller/etiquetaController';

export class EtiquetaRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new EtiquetaController();

    router.get('/', controller.get);
    router.get('/:id', controller.getById);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.remove);

    return router;
  }
}
