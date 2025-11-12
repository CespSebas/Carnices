import { RolModel } from "./RolModel";


export interface UsuarioModel {
    id: number;
    nombre?: string;
    correo: string;
    contrasenna: string;
    rol: string;
    ultimoInicioSesion: Date;
  }