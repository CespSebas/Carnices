import { UsuarioModel } from "./UsuarioModel";
import { ProductoModel } from "./ProductoModel";


export interface CarritoItemModel {
  /*id: number;
  carritoId: number;
  carrito: CarritoModel;
  productoId: number;*/
  producto: ProductoModel;
  cantidad: number;
  subtotal: number;
  impuesto: number; // Agregado para incluir el impuesto
}

export interface CarritoModel {
  id: number;
  usuarioId: number;
  usuario: UsuarioModel;
  items: CarritoItemModel[];

}
