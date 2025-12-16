import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
 import { AppRoutes } from './routes/routes';
 import { ErrorMiddleware } from './middleware/error.middleware';
 import { Router } from 'express';

 // Asegura que las estrategias de passport se configuren

const app: Express = express();
dotenv.config();

const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Ruta base de prueba
app.get('/', (req: Request, res: Response) => {
  res.send(' Servidor acaba de iniciar' );
});

// Registro de rutas personalizadas
// app.use(AppRoutes.routes);

// Middleware para manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(' Error:', err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

//---- Registro de rutas ----
 
app.use(AppRoutes.routes)
  

 

//Gestión de errores middleware
app.use(ErrorMiddleware.handleError)

//Acceso a las imágenes
app.use("/images",express.static(
  path.join(path.resolve(),"assets/uploads")))


// Servir archivos estáticos (por ejemplo imágenes en /public)
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);

});

export default app;
