import { Router } from 'express';
import { ProductoRoutes } from './producto.routes';
import { ResennaRoutes } from './resenna.routes';
import { PedidoRoutes } from './pedido.routes';
import { ImageRoutes } from './imagen.routes';
import { CategoriaRoutes } from './categoria.routes';
import { EtiquetaRoutes } from './etiqueta.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/producto', ProductoRoutes.routes);
    router.use('/categoria', CategoriaRoutes.routes);
    router.use('/etiqueta', EtiquetaRoutes.routes);
    router.use('/imagen', ImageRoutes.routes);
    router.use('/resenna', ResennaRoutes.routes);
    router.use('/pedido', PedidoRoutes.routes);

    return router;
  }
}
