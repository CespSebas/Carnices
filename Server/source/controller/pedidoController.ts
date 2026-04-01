import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/custom.error';
import { PrismaClient } from '../../generated/prisma';

export class PedidoController {
  prisma = new PrismaClient();

  // Obtener todos los pedidos con info básica
  get = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const listado = await this.prisma.pedido.findMany({
        orderBy: { id: 'desc' },
        include: {
          usuario: {
            select: {
              id: true,
              nombre: true,
              correo: true,
            },
          },
          items: {
            include: {
              presentacionProducto: {
                include: {
                  producto: {
                    select: {
                      id: true,
                      nombre: true,
                      categoria: {
                        select: { id: true, nombre: true },
                      },
                    },
                  },
                },
              },
            },
          },
          pagos: true,
        },
      });

      response.json(listado);
    } catch (error) {
      next(error);
    }
  };

  // Obtener Pedido por ID con sus relaciones
  getById = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const idPedido = parseInt(request.params.id);

      if (isNaN(idPedido)) {
        return next(AppError.badRequest('El ID no es válido'));
      }

      const pedido = await this.prisma.pedido.findFirst({
        where: { id: idPedido },
        include: {
          usuario: {
            select: {
              id: true,
              nombre: true,
              correo: true,
            },
          },
          items: {
            include: {
              presentacionProducto: {
                include: {
                  producto: {
                    select: {
                      id: true,
                      nombre: true,
                      descripcion: true,
                      precio: true,
                      categoria: {
                        select: { id: true, nombre: true },
                      },
                      imagenes: {
                        select: { url: true },
                      },
                    },
                  },
                },
              },
            },
          },
          pagos: true,
        },
      });

      if (!pedido) {
        return next(AppError.notFound('No existe el pedido'));
      }

      response.status(200).json(pedido);
    } catch (error) {
      next(error);
    }
  };

  // Buscar productos por nombre (para armar pedidos o carrito)
  search = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { termino } = request.query;

      if (typeof termino !== 'string' || termino.trim() === '') {
        return next(AppError.badRequest('El término de búsqueda es requerido'));
      }

      const searchTerm: string = termino as string;

      const productos = await this.prisma.producto.findMany({
        where: {
          nombre: {
            contains: searchTerm,
          },
        },
        include: {
          imagenes: true,
          categoria: true,
          presentaciones: true,
        },
      });

      response.json(productos);
    } catch (error) {
      next(error);
    }
  };

  // Crear Pedido
  create = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { usuarioId, items, total, metodoPago } = request.body;

      if (!usuarioId || !items || items.length === 0) {
        return next(AppError.badRequest('Datos de pedido incompletos'));
      }

      const pedido = await this.prisma.pedido.create({
        data: {
          usuarioId,
          total,
          creadoEn: new Date(),
          items: {
            create: items.map((item: any) => ({
              presentacionProductoId: item.presentacionProductoId,
              cantidad: item.cantidad,
              precioUnitario: item.precioUnitario,
            })),
          },
          pagos: metodoPago
            ? {
                create: {
                  monto: total,
                  metodo: metodoPago,
                  estado: 'PENDIENTE',
                },
              }
            : undefined,
        },
        include: {
          items: true,
          pagos: true,
        },
      });

      response.status(201).json(pedido);
    } catch (error) {
      next(error);
    }
  };

  // Actualizar estado de Pedido o Pago
  update = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const idPedido = parseInt(request.params.id);
    const { estado, estadoPago } = request.body;

    if (isNaN(idPedido)) {
      return next(AppError.badRequest('El ID no es válido'));
    }

    const pedido = await this.prisma.pedido.update({
      where: { id: idPedido },
      data: {
        estado: estado || undefined,
        pagos: estadoPago
          ? {
              updateMany: {
                where: {}, // todos los pagos relacionados
                data: { estado: estadoPago },
              },
            }
          : undefined,
      },
      include: {
        usuario: true,
        items: true,
        pagos: true,
      },
    });

    response.json(pedido);
  } catch (error) {
    next(error);
  }
};


}
