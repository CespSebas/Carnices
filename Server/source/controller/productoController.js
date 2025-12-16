"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoController = void 0;
const custom_error_1 = require("../errors/custom.error");
const prisma_1 = require("../../generated/prisma");
class ProductoController {
    constructor() {
        this.prisma = new prisma_1.PrismaClient();
        this.get = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const productos = yield this.prisma.producto.findMany({
                    orderBy: {
                        nombre: 'asc',
                    },
                    include: {
                        imagenes: true,
                        presentaciones: true,
                    },
                });
                response.json(productos);
            }
            catch (error) {
                next(error);
            }
        });
        //Obtener por Id
        this.getById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let idProducto = parseInt(request.params.id);
                if (isNaN(idProducto)) {
                    next(custom_error_1.AppError.badRequest('EL ID NO ES VALIDO'));
                }
                const objProducto = yield this.prisma.producto.findFirst({
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
                });
                if (objProducto) {
                    response.status(200).json(objProducto);
                }
                else {
                    next(custom_error_1.AppError.notFound('No existe el videojuego'));
                }
            }
            catch (error) {
                next(error);
            }
        });
        this.search = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                //Obtener los valores del query string
                const { termino } = request.query;
                if (typeof termino !== 'string' || termino.trim() === '') {
                    next(custom_error_1.AppError.badRequest('El termino de busqueda es requerido'));
                }
                const searchTerm = termino;
                const objVideojuego = yield this.prisma.producto.findMany({
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
            }
            catch (error) {
                next(error);
            }
        });
        //Crear
        this.create = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                next(error);
            }
        });
        //Actualizar
        this.update = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ProductoController = ProductoController;
