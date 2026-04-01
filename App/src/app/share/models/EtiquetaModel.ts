import { EtiquetaProductoModel } from "./EtiquetaProductoModel";

export interface EtiquetaModel {
  id: number;
  nombre: string;
  descripcion: string;
  productos: EtiquetaProductoModel;
}
