import { Rol } from "../../generated/prisma";
export const usuario = [
  {
    correo: 'sc163876@gmail.com',
    nombre: 'Sebastián Andrés Cespedes Quesada',
    contrasenna: '123456',
    rol: Rol.Administrador,
    creadoEn: new Date('2003-04-10T05:00:00Z'),
  },
  {
    correo: 'keivargas15@icloud.com',
    nombre: 'Keitty Pamela Vargas Zuñiga',
    contrasenna: '123456',
    rol: Rol.Administrador,
    creadoEn: new Date('2003-09-04T10:00:00Z'),
  },
  {
    correo: 'kai@gmail.com',
    nombre: 'Kaisito Altamirano Fuentes',
    contrasenna: '123456',
    rol: Rol.Cliente,
    creadoEn: new Date('2024-12-20T07:00:00Z'),
  }
  
];
