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
exports.PedidoController = void 0;
const custom_error_1 = require("../errors/custom.error");
const prisma_1 = require("../../generated/prisma");
class PedidoController {
    constructor() {
        this.prisma = new prisma_1.PrismaClient();
        // Obtener todos los pedidos con info básica
        this.get = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const listado = yield this.prisma.pedido.findMany({
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
            }
            catch (error) {
                next(error);
            }
        });
        // Obtener Pedido por ID con sus relaciones
        this.getById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idPedido = parseInt(request.params.id);
                if (isNaN(idPedido)) {
                    return next(custom_error_1.AppError.badRequest('El ID no es válido'));
                }
                const pedido = yield this.prisma.pedido.findFirst({
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
                    return next(custom_error_1.AppError.notFound('No existe el pedido'));
                }
                response.status(200).json(pedido);
            }
            catch (error) {
                next(error);
            }
        });
        // Buscar productos por nombre (para armar pedidos o carrito)
        this.search = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { termino } = request.query;
                if (typeof termino !== 'string' || termino.trim() === '') {
                    return next(custom_error_1.AppError.badRequest('El término de búsqueda es requerido'));
                }
                const searchTerm = termino;
                const productos = yield this.prisma.producto.findMany({
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
            }
            catch (error) {
                next(error);
            }
        });
        // Crear Pedido
        this.create = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { usuarioId, items, total, metodoPago } = request.body;
                if (!usuarioId || !items || items.length === 0) {
                    return next(custom_error_1.AppError.badRequest('Datos de pedido incompletos'));
                }
                const pedido = yield this.prisma.pedido.create({
                    data: {
                        usuarioId,
                        total,
                        creadoEn: new Date(),
                        items: {
                            create: items.map((item) => ({
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
            }
            catch (error) {
                next(error);
            }
        });
        // Actualizar estado de Pedido o Pago
        this.update = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idPedido = parseInt(request.params.id);
                const { estado, estadoPago } = request.body;
                if (isNaN(idPedido)) {
                    return next(custom_error_1.AppError.badRequest('El ID no es válido'));
                }
                const pedido = yield this.prisma.pedido.update({
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
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.PedidoController = PedidoController;
