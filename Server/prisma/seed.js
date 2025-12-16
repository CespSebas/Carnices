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
const categoria_1 = require("./seeds/categoria");
const usuario_1 = require("./seeds/usuario");
const etiqueta_1 = require("./seeds/etiqueta");
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Start seeding ...`);
        // 1. Crear usuarios - Sin relaciones 
        yield prisma.usuario.createMany({ data: usuario_1.usuario });
        // 2. Crear categorías - Sin relaciones 
        yield prisma.categoria.createMany({ data: categoria_1.categoria });
        // 3. Crear etiquetas - Sin relaciones
        yield prisma.etiqueta.createMany({ data: etiqueta_1.etiqueta });
        // ==========================
        // 4. Crear productos con relaciones y presentaciones
        // ==========================
        yield prisma.producto.create({
            data: {
                nombre: 'Salchichón de Pavo',
                descripcion: 'Salchichón elaborado con pavo, receta alemana y sabor auténtico',
                precio: new prisma_1.Prisma.Decimal(12.50),
                activo: true,
                categoria: { connect: { id: 1 } },
                creador: { connect: { id: 1 } },
                imagenes: { create: [{ url: 'salchichon_pavo_artesanal.jpg' }] },
                etiquetas: {
                    create: [
                        { etiqueta: { connect: { id: 1 } } },
                        { etiqueta: { connect: { id: 4 } } },
                        { etiqueta: { connect: { id: 7 } } },
                    ],
                },
                presentaciones: {
                    create: [
                        { nombre: '1 Kilo', peso: new prisma_1.Prisma.Decimal(1), precio: new prisma_1.Prisma.Decimal(12.50), stock: 50 },
                        { nombre: '500g', peso: new prisma_1.Prisma.Decimal(0.5), precio: new prisma_1.Prisma.Decimal(6.25), stock: 25 },
                    ],
                },
            },
        });
        yield prisma.producto.create({
            data: {
                nombre: 'Jamón de Pavo Premium',
                descripcion: 'Jamón de pavo de alta calidad, suave y fresco',
                precio: new prisma_1.Prisma.Decimal(15.00),
                activo: true,
                categoria: { connect: { id: 2 } },
                creador: { connect: { id: 1 } },
                imagenes: { create: [{ url: 'jamon_pavo_premium.jpg' }] },
                etiquetas: {
                    create: [
                        { etiqueta: { connect: { id: 1 } } },
                        { etiqueta: { connect: { id: 5 } } },
                        { etiqueta: { connect: { id: 10 } } },
                    ],
                },
                presentaciones: {
                    create: [
                        { nombre: '1 Kilo', peso: new prisma_1.Prisma.Decimal(1), precio: new prisma_1.Prisma.Decimal(15.00), stock: 40 },
                        { nombre: '500g', peso: new prisma_1.Prisma.Decimal(0.5), precio: new prisma_1.Prisma.Decimal(7.50), stock: 20 },
                    ],
                },
            },
        });
        yield prisma.producto.create({
            data: {
                nombre: 'Chorizo Ahumado Tradicional',
                descripcion: 'Chorizo de cerdo con sabor ahumado auténtico',
                precio: new prisma_1.Prisma.Decimal(11.25),
                activo: true,
                categoria: { connect: { id: 4 } },
                creador: { connect: { id: 1 } },
                imagenes: { create: [{ url: 'chorizo_ahumado_tradicional.jpg' }] },
                etiquetas: {
                    create: [
                        { etiqueta: { connect: { id: 2 } } },
                        { etiqueta: { connect: { id: 13 } } },
                        { etiqueta: { connect: { id: 20 } } },
                    ],
                },
                presentaciones: {
                    create: [
                        { nombre: '1 Kilo', peso: new prisma_1.Prisma.Decimal(1), precio: new prisma_1.Prisma.Decimal(11.25), stock: 60 },
                        { nombre: '500g', peso: new prisma_1.Prisma.Decimal(0.5), precio: new prisma_1.Prisma.Decimal(5.63), stock: 30 },
                    ],
                },
            },
        });
        yield prisma.producto.create({
            data: {
                nombre: 'Mortadela Light de Cerdo',
                descripcion: 'Mortadela baja en grasa, ideal para dieta ligera',
                precio: new prisma_1.Prisma.Decimal(9.75),
                activo: true,
                categoria: { connect: { id: 5 } },
                creador: { connect: { id: 1 } },
                imagenes: { create: [{ url: 'mortadela_light_cerdo.jpg' }] },
                etiquetas: {
                    create: [
                        { etiqueta: { connect: { id: 2 } } },
                        { etiqueta: { connect: { id: 6 } } },
                        { etiqueta: { connect: { id: 11 } } },
                    ],
                },
                presentaciones: {
                    create: [
                        { nombre: '1 Kilo', peso: new prisma_1.Prisma.Decimal(1), precio: new prisma_1.Prisma.Decimal(9.75), stock: 55 },
                        { nombre: '500g', peso: new prisma_1.Prisma.Decimal(0.5), precio: new prisma_1.Prisma.Decimal(4.88), stock: 27 },
                    ],
                },
            },
        });
        // ... y así para los demás productos, siguiendo exactamente la misma estructura ...
        // Salchichón Gourmet de Res
        yield prisma.producto.create({
            data: {
                nombre: 'Salchichón Gourmet de Res',
                descripcion: 'Salchichón de res con sabor refinado para paladares exigentes',
                precio: new prisma_1.Prisma.Decimal(18.50),
                activo: true,
                categoria: { connect: { id: 1 } },
                creador: { connect: { id: 1 } },
                imagenes: { create: [{ url: 'salchichon_gourmet_res.jpg' }] },
                etiquetas: {
                    create: [
                        { etiqueta: { connect: { id: 3 } } },
                        { etiqueta: { connect: { id: 19 } } },
                        { etiqueta: { connect: { id: 7 } } },
                    ],
                },
                presentaciones: {
                    create: [
                        { nombre: '1 Kilo', peso: new prisma_1.Prisma.Decimal(1), precio: new prisma_1.Prisma.Decimal(18.50), stock: 30 },
                        { nombre: '500g', peso: new prisma_1.Prisma.Decimal(0.5), precio: new prisma_1.Prisma.Decimal(9.25), stock: 15 },
                    ],
                },
            },
        });
        // Repite el mismo patrón para los otros productos: Jamón en Rodajas Natural, Snack de Pavo Light,
        // Chorizo Picante Parrillero, Mortadela Tradicional Gourmet, Salchichón Natural para Sandwich
    });
}
main()
    .then(() => {
    console.log('Seed ejecutado correctamente');
    return prisma.$disconnect();
})
    .catch((error) => {
    console.error('Error ejecutando seed:', error);
    return prisma.$disconnect().finally(() => process.exit(1));
});
