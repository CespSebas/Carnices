"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes/routes");
const error_middleware_1 = require("./middleware/error.middleware");
// Asegura que las estrategias de passport se configuren
const app = (0, express_1.default)();
dotenv.config();
const port = process.env.PORT || 3000;
// Middlewares
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
// Ruta base de prueba
app.get('/', (req, res) => {
    res.send(' Servidor acaba de iniciar');
});
// Registro de rutas personalizadas
// app.use(AppRoutes.routes);
// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error(' Error:', err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});
//---- Registro de rutas ----
app.use(routes_1.AppRoutes.routes);
//Gestión de errores middleware
app.use(error_middleware_1.ErrorMiddleware.handleError);
//Acceso a las imágenes
app.use("/images", express_1.default.static(path_1.default.join(path_1.default.resolve(), "assets/uploads")));
// Servir archivos estáticos (por ejemplo imágenes en /public)
app.use('/public', express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});
exports.default = app;
