import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/custom.error';
import { prisma } from '../lib/prisma';

export class CategoriaController {
  get = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const categorias = await prisma.categoria.findMany({
        orderBy: { nombre: 'asc' },
        include: { _count: { select: { productos: true } } },
      });
      response.json(categorias);
    } catch (error) {
      next(error);
    }
  };

  getById = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) return next(AppError.badRequest('ID no válido'));

      const categoria = await prisma.categoria.findUnique({
        where: { id },
        include: {
          productos: {
            where: { activo: true },
            select: { id: true, nombre: true, precio: true },
          },
        },
      });

      if (!categoria) return next(AppError.notFound('Categoría no encontrada'));
      response.json(categoria);
    } catch (error) {
      next(error);
    }
  };

  create = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { nombre, descripcion } = request.body;
      if (!nombre) return next(AppError.badRequest('El nombre es requerido'));

      const categoria = await prisma.categoria.create({
        data: { nombre, descripcion },
      });

      response.status(201).json(categoria);
    } catch (error) {
      next(error);
    }
  };

  update = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) return next(AppError.badRequest('ID no válido'));

      const { nombre, descripcion, activo } = request.body;

      const categoria = await prisma.categoria.findUnique({ where: { id } });
      if (!categoria) return next(AppError.notFound('Categoría no encontrada'));

      const actualizada = await prisma.categoria.update({
        where: { id },
        data: {
          nombre: nombre ?? undefined,
          descripcion: descripcion ?? undefined,
          activo: activo ?? undefined,
        },
      });

      response.json(actualizada);
    } catch (error) {
      next(error);
    }
  };

  remove = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) return next(AppError.badRequest('ID no válido'));

      const categoria = await prisma.categoria.findUnique({ where: { id } });
      if (!categoria) return next(AppError.notFound('Categoría no encontrada'));

      const tieneProductos = await prisma.producto.count({
        where: { categoriaId: id, activo: true },
      });
      if (tieneProductos > 0) {
        return next(AppError.badRequest('No se puede eliminar una categoría con productos activos'));
      }

      await prisma.categoria.update({ where: { id }, data: { activo: false } });
      response.json({ message: 'Categoría desactivada exitosamente' });
    } catch (error) {
      next(error);
    }
  };
}
