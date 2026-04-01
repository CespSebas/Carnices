import { Router } from 'express';
import { ResennaController } from '../controller/resennaController';

export class ResennaRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ResennaController();

    router.get('/', controller.get);
    router.get('/:id', controller.getById);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.remove);

    return router;
  }
}
