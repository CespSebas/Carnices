import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/custom.error';
import { PrismaClient } from '../../generated/prisma';
export class ResennaController {
  prisma = new PrismaClient();
  get = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const listado = await this.prisma.resenna.findMany({
        orderBy: {
          valoracion: 'desc',
        },
        include: {
          usuario: true,
          producto: true,
        },
      });
      response.json(listado);
    } catch (error) {
      next(error);
    }
  };
  //Obtener por Id
  getById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const idResenna = parseInt(request.params.id);

    if (isNaN(idResenna)) {
      return next(AppError.badRequest('El ID de reseña no es válido'));
    }

    const objResenna = await this.prisma.resenna.findUnique({
      where: { id: idResenna },
      include: {
        usuario: {
          select: {
            correo: true,
            nombre: true, // Ajusta según campos que tenga tu modelo Usuario
          },
        },
        producto: {
          select: {
            id: true,
            nombre: true,
          },
        },
       
      },
    });

    if (objResenna) {
      response.status(200).json(objResenna);
    } else {
      next(AppError.notFound('No existe la reseña'));
    }
  } catch (error: any) {
    next(error);
  }
};


  search = async (request: Request, response: Response, next: NextFunction) => {
    try {
      //Obtener los valores del query string

      const { termino } = request.query;
      if (typeof termino !== 'string' || termino.trim() === '') {
        next(AppError.badRequest('El termino de busqueda es requerido'));
      }
      const searchTerm: string = termino as string;
      const objVideojuego = await this.prisma.producto.findMany({
        where: {
          nombre: {
            contains: searchTerm,
          },
        },
        include: {
          
        },
      });

      response.json(objVideojuego); //Respuesta
    } catch (error) {
      next(error);
    }
  };
  //Crear
  create = async (request: Request, response: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };
  //Actualizar
  update = async (request: Request, response: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };
}
