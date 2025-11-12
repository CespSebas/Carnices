import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/custom.error';
import { PrismaClient } from '../../generated/prisma';
export class ProductoController {
  prisma = new PrismaClient();
  get = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const productos = await this.prisma.producto.findMany({
      orderBy: {
        nombre: 'asc',
      },
      include: {
        imagenes: true,
        presentaciones: true,
      },
    });

    response.json(productos);
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
      let idProducto = parseInt(request.params.id);

      if (isNaN(idProducto)) {
        next(AppError.badRequest('EL ID NO ES VALIDO'));
      }

      const objProducto = await this.prisma.producto.findFirst({
        where: { id: idProducto },
        include: {
          imagenes: true,
          categoria: true,
          etiquetas: {
            include: {
              etiqueta: {
                select: {
                  nombre: true,
                  descripcion: true,
                },
              },
            },
          },
          
          resennas: {
            select: {
              descripcion: true,
              valoracion: true,
              creadoEn: true,
              usuario: {
                select: {
                  nombre: true,
                },
              },
            },
          },
        },
      },
      );

      if (objProducto) {
        response.status(200).json(objProducto);
      } else {
        next(AppError.notFound('No existe el videojuego'));
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
          imagenes: true,
          
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
