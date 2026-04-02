import { categoria } from './seeds/categoria';
import { usuario } from './seeds/usuario';
import { etiqueta } from './seeds/etiqueta';
import { PrismaClient, Prisma } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // 1. Crear usuarios
  await prisma.usuario.createMany({ data: usuario });

  // 2. Crear categorías
  await prisma.categoria.createMany({ data: categoria });

  // 3. Crear etiquetas
  await prisma.etiqueta.createMany({ data: etiqueta });

  // ==========================
  // 4. Productos reales
  // IDs categoría: 1=Jamones, 2=Salchichones, 3=Salchichas
  // IDs etiqueta:  1=Pavo, 4=Sin CDM, 5=Económico, 6=Desayuno, 15=Para Sandwich
  // ==========================

  // Jamón Carne Prensada Sin CDM
  await prisma.producto.create({
    data: {
      nombre: 'Jamón Carne Prensada Sin CDM',
      descripcion: 'Jamón de carne prensada sin colorantes ni aditivos artificiales. Ideal para sandwich y meriendas.',
      precio: new Prisma.Decimal(4320.00), // precio por kg referencial
      activo: true,
      categoria: { connect: { id: 1 } },
      creador: { connect: { id: 1 } },
      imagenes: { create: [{ url: 'jamon_prensado_sin_cdm.jpg', esPrincipal: true }] },
      etiquetas: {
        create: [
          { etiqueta: { connect: { id: 4 } } },  // Sin CDM
          { etiqueta: { connect: { id: 15 } } }, // Para Sandwich
        ],
      },
      presentaciones: {
        create: [
          { nombre: '250g', peso: new Prisma.Decimal(0.25), precio: new Prisma.Decimal(1215.00), stock: 30 },
          { nombre: '500g', peso: new Prisma.Decimal(0.50), precio: new Prisma.Decimal(2160.00), stock: 25 },
          { nombre: '3kg aprox', peso: new Prisma.Decimal(3.00), precio: new Prisma.Decimal(4050.00), stock: 10 },
        ],
      },
    },
  });

  // Jamón Económico
  await prisma.producto.create({
    data: {
      nombre: 'Jamón Económico',
      descripcion: 'Jamón accesible y de buen sabor, perfecto para el día a día.',
      precio: new Prisma.Decimal(3510.00),
      activo: true,
      categoria: { connect: { id: 1 } },
      creador: { connect: { id: 1 } },
      imagenes: { create: [{ url: 'jamon_economico.jpg', esPrincipal: true }] },
      etiquetas: {
        create: [
          { etiqueta: { connect: { id: 5 } } },  // Económico
          { etiqueta: { connect: { id: 15 } } }, // Para Sandwich
        ],
      },
      presentaciones: {
        create: [
          { nombre: '250g', peso: new Prisma.Decimal(0.25), precio: new Prisma.Decimal(945.00), stock: 40 },
          { nombre: '500g', peso: new Prisma.Decimal(0.50), precio: new Prisma.Decimal(1755.00), stock: 35 },
          { nombre: '3kg aprox', peso: new Prisma.Decimal(3.00), precio: new Prisma.Decimal(3105.00), stock: 12 },
        ],
      },
    },
  });

  // Jamón Pavo 13%
  await prisma.producto.create({
    data: {
      nombre: 'Jamón Pavo',
      descripcion: 'Jamón elaborado con carne de pavo, suave, fresco y bajo en grasa.',
      precio: new Prisma.Decimal(4928.00),
      activo: true,
      categoria: { connect: { id: 1 } },
      creador: { connect: { id: 1 } },
      imagenes: { create: [{ url: 'jamon_pavo.jpg', esPrincipal: true }] },
      etiquetas: {
        create: [
          { etiqueta: { connect: { id: 1 } } },  // Pavo
          { etiqueta: { connect: { id: 9 } } },  // Bajo en Grasa
          { etiqueta: { connect: { id: 15 } } }, // Para Sandwich
        ],
      },
      presentaciones: {
        create: [
          { nombre: '250g', peso: new Prisma.Decimal(0.25), precio: new Prisma.Decimal(1384.00), stock: 30 },
          { nombre: '500g', peso: new Prisma.Decimal(0.50), precio: new Prisma.Decimal(2464.00), stock: 25 },
          { nombre: '3kg aprox', peso: new Prisma.Decimal(3.00), precio: new Prisma.Decimal(4320.00), stock: 8 },
        ],
      },
    },
  });

  // Salchichón Pavo 13%
  await prisma.producto.create({
    data: {
      nombre: 'Salchichón Pavo 13%',
      descripcion: 'Salchichón elaborado con carne de pavo, sabor suave y textura firme.',
      precio: new Prisma.Decimal(2430.00),
      activo: true,
      categoria: { connect: { id: 2 } },
      creador: { connect: { id: 1 } },
      imagenes: { create: [{ url: 'salchichon_pavo.jpg', esPrincipal: true }] },
      etiquetas: {
        create: [
          { etiqueta: { connect: { id: 1 } } },  // Pavo
          { etiqueta: { connect: { id: 9 } } },  // Bajo en Grasa
        ],
      },
      presentaciones: {
        create: [
          { nombre: '500g', peso: new Prisma.Decimal(0.50), precio: new Prisma.Decimal(1249.00), stock: 35 },
          { nombre: '1kg (anillo)', peso: new Prisma.Decimal(1.00), precio: new Prisma.Decimal(2430.00), stock: 20 },
        ],
      },
    },
  });

  // Salchichas Desayuno
  await prisma.producto.create({
    data: {
      nombre: 'Salchichas Desayuno',
      descripcion: 'Salchichas jugosas ideales para el desayuno, fáciles de preparar.',
      precio: new Prisma.Decimal(2700.00),
      activo: true,
      categoria: { connect: { id: 3 } },
      creador: { connect: { id: 1 } },
      imagenes: { create: [{ url: 'salchichas_desayuno.jpg', esPrincipal: true }] },
      etiquetas: {
        create: [
          { etiqueta: { connect: { id: 6 } } },  // Desayuno
          { etiqueta: { connect: { id: 18 } } }, // Parrillero
        ],
      },
      presentaciones: {
        create: [
          { nombre: '500g', peso: new Prisma.Decimal(0.50), precio: new Prisma.Decimal(1519.00), stock: 40 },
          { nombre: '1kg', peso: new Prisma.Decimal(1.00), precio: new Prisma.Decimal(2700.00), stock: 25 },
        ],
      },
    },
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
