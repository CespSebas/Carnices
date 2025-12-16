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
exports.ResennaController = void 0;
const custom_error_1 = require("../errors/custom.error");
const prisma_1 = require("../../generated/prisma");
class ResennaController {
    constructor() {
        this.prisma = new prisma_1.PrismaClient();
        this.get = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const listado = yield this.prisma.resenna.findMany({
                    orderBy: {
                        valoracion: 'desc',
                    },
                    include: {
                        usuario: true,
                        producto: true,
                    },
                });
                response.json(listado);
            }
            catch (error) {
                next(error);
            }
        });
        //Obtener por Id
        this.getById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idResenna = parseInt(request.params.id);
                if (isNaN(idResenna)) {
                    return next(custom_error_1.AppError.badRequest('El ID de reseña no es válido'));
                }
                const objResenna = yield this.prisma.resenna.findUnique({
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
                }
                else {
                    next(custom_error_1.AppError.notFound('No existe la reseña'));
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
                    include: {},
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
exports.ResennaController = ResennaController;
