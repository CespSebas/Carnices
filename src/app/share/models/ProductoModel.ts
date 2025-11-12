
import { EtiquetaProductoModel } from "./EtiquetaProductoModel";
// Falta imagen 
import { ResennaModel } from "./ResennaModel";

import { PedidoItemModel } from "./PedidoItemModel";
import { CarritoModel } from "./CarritoModel";

import { ImagenModel } from "./ImagenModel";

export interface ProductoModel {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  valoracionPromedio: number;
  activo: boolean;

  categoriaId: number;


  etiquetas: EtiquetaProductoModel[];
  imagenes: ImagenModel[]; // ✅ Agregado

  resennas: ResennaModel[];
  
  pedidoItems: PedidoItemModel[];
  carritoItems: CarritoModel[];
 

  tienePromocion?: boolean;
  
  precioDescuento?: number;
  descuento?: number;
}