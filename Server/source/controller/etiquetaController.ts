import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/custom.error';
import { prisma } from '../lib/prisma';

export class EtiquetaController {
  get = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const etiquetas = await prisma.etiqueta.findMany({
        orderBy: { nombre: 'asc' },
        include: { _count: { select: { productos: true } } },
      });
      response.json(etiquetas);
    } catch (error) {
      next(error);
    }
  };

  getById = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) return next(AppError.badRequest('ID no válido'));

      const etiqueta = await prisma.etiqueta.findUnique({
        where: { id },
        include: {
          productos: {
            include: {
              producto: { select: { id: true, nombre: true } },
            },
          },
        },
      });

      if (!etiqueta) return next(AppError.notFound('Etiqueta no encontrada'));
      response.json(etiqueta);
    } catch (error) {
      next(error);
    }
  };

  create = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { nombre, descripcion } = request.body;
      if (!nombre) return next(AppError.badRequest('El nombre es requerido'));

      const etiqueta = await prisma.etiqueta.create({
        data: { nombre, descripcion },
      });

      response.status(201).json(etiqueta);
    } catch (error) {
      next(error);
    }
  };

  update = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) return next(AppError.badRequest('ID no válido'));

      const { nombre, descripcion } = request.body;

      const etiqueta = await prisma.etiqueta.findUnique({ where: { id } });
      if (!etiqueta) return next(AppError.notFound('Etiqueta no encontrada'));

      const actualizada = await prisma.etiqueta.update({
        where: { id },
        data: {
          nombre: nombre ?? undefined,
          descripcion: descripcion ?? undefined,
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

      const etiqueta = await prisma.etiqueta.findUnique({ where: { id } });
      if (!etiqueta) return next(AppError.notFound('Etiqueta no encontrada'));

      await prisma.etiqueta.delete({ where: { id } });
      response.json({ message: 'Etiqueta eliminada exitosamente' });
    } catch (error) {
      next(error);
    }
  };
}
