import { ProductoModel } from "./ProductoModel";
import { UsuarioModel } from "./UsuarioModel";

export interface ResennaModel {
  id: number;
  fecha: Date;
  descripcion: string;
  valoracion: number;
  estado: boolean;

  usuarioId: number;
  productoId: number;

  usuario: UsuarioModel;
  producto: ProductoModel;
}
