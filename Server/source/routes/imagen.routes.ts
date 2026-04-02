import { Router } from 'express';
import { ImageController } from '../controller/imageController';

export class ImageRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ImageController();

    // Genérico
    router.post('/upload', (req, res, next) => { controller.upload(req, res, next); });
    router.get('/files', (req, res, next) => { controller.getListFiles(req, res, next); });
    router.get('/files/:name', (req, res, next) => { controller.download(req, res, next); });

    // Por producto
    router.post('/producto/:productoId', (req, res, next) => { controller.uploadForProducto(req, res, next); });
    router.delete('/:id', (req, res, next) => { controller.deleteById(req, res, next); });
    router.patch('/:id/principal', (req, res, next) => { controller.setPrincipal(req, res, next); });

    return router;
  }
}
