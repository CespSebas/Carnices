import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import uploadFile from "../middleware/ImageConfig";
import { prisma } from "../lib/prisma";
import { AppError } from "../errors/custom.error";

const directoryPath = path.join(path.resolve(), "/assets/uploads/");

export class ImageController {

  // Subida genérica de archivos
  upload = async (request: Request, response: Response, next: NextFunction) => {
    try {
      await new Promise<void>((resolve, reject) => {
        uploadFile(request, response, (err: any) => {
          if (err) reject(err);
          else resolve();
        });
      });

      if (!request.files || (request.files as Express.Multer.File[]).length === 0) {
        response.status(400).send({ message: "No se subió ningún archivo" });
        return;
      }

      response.status(200).json({
        message: "Archivo(s) subido(s) exitosamente",
        fileNames: (request.files as Express.Multer.File[]).map(f => f.filename),
      });
    } catch (error) {
      next(error);
    }
  };

  // Subir imágenes y asociarlas directamente a un producto
  uploadForProducto = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const productoId = parseInt(request.params.productoId);
      if (isNaN(productoId)) return next(AppError.badRequest("ID de producto no válido"));

      await new Promise<void>((resolve, reject) => {
        uploadFile(request, response, (err: any) => {
          if (err) reject(err);
          else resolve();
        });
      });

      if (!request.files || (request.files as Express.Multer.File[]).length === 0) {
        response.status(400).json({ message: "No se subió ningún archivo" });
        return;
      }

      const producto = await prisma.producto.findUnique({ where: { id: productoId } });
      if (!producto) return next(AppError.notFound("Producto no encontrado"));

      const files = request.files as Express.Multer.File[];
      const countExistentes = await prisma.imagen.count({ where: { productoId } });

      const imagenes = await Promise.all(
        files.map((file, index) =>
          prisma.imagen.create({
            data: {
              url: file.filename,
              productoId,
              esPrincipal: countExistentes === 0 && index === 0,
              orden: countExistentes + index,
            },
          })
        )
      );

      response.status(201).json(imagenes);
    } catch (error) {
      next(error);
    }
  };

  // Eliminar una imagen por ID (BD + archivo físico)
  deleteById = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) return next(AppError.badRequest("ID no válido"));

      const imagen = await prisma.imagen.findUnique({ where: { id } });
      if (!imagen) return next(AppError.notFound("Imagen no encontrada"));

      const filePath = path.join(directoryPath, imagen.url);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

      await prisma.imagen.delete({ where: { id } });

      // Si era la principal, asignar la primera restante como nueva principal
      if (imagen.esPrincipal) {
        const primera = await prisma.imagen.findFirst({
          where: { productoId: imagen.productoId },
          orderBy: { orden: "asc" },
        });
        if (primera) await prisma.imagen.update({ where: { id: primera.id }, data: { esPrincipal: true } });
      }

      response.json({ message: "Imagen eliminada exitosamente" });
    } catch (error) {
      next(error);
    }
  };

  // Marcar una imagen como principal
  setPrincipal = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) return next(AppError.badRequest("ID no válido"));

      const imagen = await prisma.imagen.findUnique({ where: { id } });
      if (!imagen) return next(AppError.notFound("Imagen no encontrada"));

      await prisma.imagen.updateMany({
        where: { productoId: imagen.productoId },
        data: { esPrincipal: false },
      });

      const actualizada = await prisma.imagen.update({
        where: { id },
        data: { esPrincipal: true },
      });

      response.json(actualizada);
    } catch (error) {
      next(error);
    }
  };

  // Listar archivos físicos
  getListFiles = (_request: Request, response: Response, next: NextFunction): void => {
    try {
      fs.readdir(directoryPath, (err, files) => {
        if (err) { response.status(500).send({ message: "No se pueden leer los archivos" }); return; }
        const fileInfos = files.map(file => ({
          name: file,
          url: `http://localhost:3000/images/${file}`,
        }));
        response.status(200).send(fileInfos);
      });
    } catch (error) {
      next(error);
    }
  };

  download = (request: Request, response: Response, next: NextFunction): void => {
    try {
      const fileName = request.params.name;
      response.download(path.join(directoryPath, fileName), fileName, (err) => {
        if (err) response.status(500).send({ message: "No se pudo descargar el archivo. " + err });
      });
    } catch (error) {
      next(error);
    }
  };
}
