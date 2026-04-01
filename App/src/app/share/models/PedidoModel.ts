import { UsuarioModel } from "./UsuarioModel";
import { PedidoItemModel } from "./PedidoItemModel";

import { EstadoPedidoModel } from "./EstadoPedidoModel";
import { PagoTarjetaModel } from "./PagoTarjetaModel";

export type EstadoPedido = "Pendiente De Pago" | "Pagado" | "En Preparacion" | "Enviado" | "Entregado" | "Cancelado";
export type MetodoPago = "Tarjeta" | "Efectivo"; // Ajusta según tu enum real

export interface PedidoModel {
  id: number;
  usuarioId: number;
//  usuario: UsuarioModel;

  estado: EstadoPedido;
  fecha: Date;
  direccionEnvio: string;
  metodoPago: MetodoPago;

  subtotal: number; // Prisma Decimal -> frontend number
  total: number;

  items: PedidoItemModel[];
  
  transiciones: EstadoPedidoModel[];
  pagoTarjeta?: PagoTarjetaModel;
}
