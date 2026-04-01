import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/custom.error';
import { prisma } from '../lib/prisma';

export class ProductoController {
  get = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const productos = await prisma.producto.findMany({
        where: { activo: true },
        orderBy: { nombre: 'asc' },
        include: { imagenes: true, presentaciones: { where: { activo: true } } },
      });
      response.json(productos);
    } catch (error) {
      next(error);
    }
  };

  getById = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const idProducto = parseInt(request.params.id);
      if (isNaN(idProducto)) return next(AppError.badRequest('El ID no es válido'));

      const producto = await prisma.producto.findFirst({
        where: { id: idProducto },
        include: {
          imagenes: true,
          categoria: true,
          presentaciones: true,
          etiquetas: {
            include: {
              etiqueta: { select: { id: true, nombre: true, descripcion: true } },
            },
          },
          resennas: {
            where: { activo: true },
            select: {
              id: true,
              descripcion: true,
              valoracion: true,
              creadoEn: true,
              usuario: { select: { nombre: true } },
            },
          },
        },
      });

      if (!producto) return next(AppError.notFound('Producto no encontrado'));
      response.status(200).json(producto);
    } catch (error) {
      next(error);
    }
  };

  search = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { termino } = request.query;
      if (typeof termino !== 'string' || termino.trim() === '') {
        return next(AppError.badRequest('El término de búsqueda es requerido'));
      }

      const productos = await prisma.producto.findMany({
        where: {
          activo: true,
          nombre: { contains: termino },
        },
        include: { imagenes: true, presentaciones: { where: { activo: true } } },
      });

      response.json(productos);
    } catch (error) {
      next(error);
    }
  };

  create = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { nombre, descripcion, precio, categoriaId, creadorId, presentaciones, etiquetaIds } =
        request.body;

      if (!nombre || precio === undefined || !categoriaId) {
        return next(AppError.badRequest('Nombre, precio y categoría son requeridos'));
      }

      const producto = await prisma.producto.create({
        data: {
          nombre,
          descripcion,
          precio,
          categoriaId,
          creadorId: creadorId || undefined,
          presentaciones:
            presentaciones?.length > 0
              ? {
                  create: presentaciones.map((p: any) => ({
                    nombre: p.nombre,
                    peso: p.peso ?? undefined,
                    precio: p.precio,
                    stock: p.stock ?? 0,
                  })),
                }
              : undefined,
          etiquetas:
            etiquetaIds?.length > 0
              ? {
                  create: etiquetaIds.map((etiquetaId: number) => ({ etiquetaId })),
                }
              : undefined,
        },
        include: {
          categoria: true,
          presentaciones: true,
          etiquetas: { include: { etiqueta: true } },
        },
      });

      response.status(201).json(producto);
    } catch (error) {
      next(error);
    }
  };

  update = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const idProducto = parseInt(request.params.id);
      if (isNaN(idProducto)) return next(AppError.badRequest('El ID no es válido'));

      const producto = await prisma.producto.findUnique({ where: { id: idProducto } });
      if (!producto) return next(AppError.notFound('Producto no encontrado'));

      const { nombre, descripcion, precio, categoriaId, activo } = request.body;

      const actualizado = await prisma.producto.update({
        where: { id: idProducto },
        data: {
          nombre: nombre ?? undefined,
          descripcion: descripcion ?? undefined,
          precio: precio ?? undefined,
          categoriaId: categoriaId ?? undefined,
          activo: activo ?? undefined,
        },
        include: {
          categoria: true,
          presentaciones: true,
          imagenes: true,
        },
      });

      response.json(actualizado);
    } catch (error) {
      next(error);
    }
  };

  remove = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const idProducto = parseInt(request.params.id);
      if (isNaN(idProducto)) return next(AppError.badRequest('El ID no es válido'));

      const producto = await prisma.producto.findUnique({ where: { id: idProducto } });
      if (!producto) return next(AppError.notFound('Producto no encontrado'));

      await prisma.producto.update({
        where: { id: idProducto },
        data: { activo: false },
      });

      response.json({ message: 'Producto desactivado exitosamente' });
    } catch (error) {
      next(error);
    }
  };
}
