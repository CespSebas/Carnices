import { EtiquetaModel } from './EtiquetaModel';
import { ProductoModel } from './ProductoModel';

export interface EtiquetaProductoModel {
  etiquetaId: number;
  productoId: number;
  etiqueta: EtiquetaModel;
  producto: ProductoModel;
}
