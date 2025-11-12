import { Router } from 'express';
import { ProductoRoutes } from './producto.routes';
import { ResennaRoutes } from './resenna.routes';
import { PedidoRoutes } from './pedido.routes';
import { ImageRoutes } from './imagen.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // localhost:3000/producto/
    router.use('/producto', ProductoRoutes.routes);

    router.use('/imagen', ImageRoutes.routes);

    router.use('/resenna', ResennaRoutes.routes);

    router.use('/pedido', PedidoRoutes.routes);

    return router;
  }
}
