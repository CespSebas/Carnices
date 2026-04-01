import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/custom.error';
import { prisma } from '../lib/prisma';

export class ResennaController {
  get = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const listado = await prisma.resenna.findMany({
        where: { activo: true },
        orderBy: { valoracion: 'desc' },
        include: {
          usuario: { select: { id: true, nombre: true } },
          producto: { select: { id: true, nombre: true } },
        },
      });
      response.json(listado);
    } catch (error) {
      next(error);
    }
  };

  getById = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const idResenna = parseInt(request.params.id);
      if (isNaN(idResenna)) return next(AppError.badRequest('El ID de reseña no es válido'));

      const resenna = await prisma.resenna.findUnique({
        where: { id: idResenna },
        include: {
          usuario: { select: { id: true, nombre: true, correo: true } },
          producto: { select: { id: true, nombre: true } },
        },
      });

      if (!resenna) return next(AppError.notFound('Reseña no encontrada'));
      response.status(200).json(resenna);
    } catch (error) {
      next(error);
    }
  };

  create = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { descripcion, valoracion, productoId, usuarioId } = request.body;

      if (!descripcion || valoracion === undefined || !productoId || !usuarioId) {
        return next(AppError.badRequest('Descripción, valoración, producto y usuario son requeridos'));
      }

      if (valoracion < 1 || valoracion > 5) {
        return next(AppError.badRequest('La valoración debe estar entre 1 y 5'));
      }

      const resenna = await prisma.resenna.create({
        data: { descripcion, valoracion, productoId, usuarioId },
        include: {
          usuario: { select: { id: true, nombre: true } },
          producto: { select: { id: true, nombre: true } },
        },
      });

      response.status(201).json(resenna);
    } catch (error) {
      next(error);
    }
  };

  update = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const idResenna = parseInt(request.params.id);
      if (isNaN(idResenna)) return next(AppError.badRequest('El ID de reseña no es válido'));

      const resenna = await prisma.resenna.findUnique({ where: { id: idResenna } });
      if (!resenna) return next(AppError.notFound('Reseña no encontrada'));

      const { descripcion, valoracion, activo } = request.body;

      if (valoracion !== undefined && (valoracion < 1 || valoracion > 5)) {
        return next(AppError.badRequest('La valoración debe estar entre 1 y 5'));
      }

      const actualizada = await prisma.resenna.update({
        where: { id: idResenna },
        data: {
          descripcion: descripcion ?? undefined,
          valoracion: valoracion ?? undefined,
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
      const idResenna = parseInt(request.params.id);
      if (isNaN(idResenna)) return next(AppError.badRequest('El ID de reseña no es válido'));

      const resenna = await prisma.resenna.findUnique({ where: { id: idResenna } });
      if (!resenna) return next(AppError.notFound('Reseña no encontrada'));

      await prisma.resenna.update({ where: { id: idResenna }, data: { activo: false } });
      response.json({ message: 'Reseña desactivada exitosamente' });
    } catch (error) {
      next(error);
    }
  };
}
