"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = __importDefault(require("../controller/indexController"));
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/login', indexController_1.default.login);
        this.router.get('/store', indexController_1.default.getRecurso);
        this.router.get('/categoria', indexController_1.default.getCategoria);
        this.router.get('/revision', indexController_1.default.getRevisiones);
        this.router.post('/busqueda', indexController_1.default.getBusqueda);
        this.router.post('/registro', indexController_1.default.register);
        this.router.post('/recuperar', indexController_1.default.recuperarPsw);
        this.router.post('/profile', indexController_1.default.perfil);
        this.router.post('/publicados', indexController_1.default.publicados);
        this.router.post('/insertarFactura', indexController_1.default.insertarFactura);
        this.router.post('/detalle', indexController_1.default.detalle_producto);
        this.router.post('/favorite', indexController_1.default.favorite);
        this.router.post('/comments', indexController_1.default.comments);
        this.router.post('/edit_profile', indexController_1.default.edit_profile);
        this.router.post('/eliminar_fav', indexController_1.default.eliminar_favs);
        this.router.post('/agregar_fav', indexController_1.default.agregar_favs);
        this.router.post('/comentar', indexController_1.default.comentar);
        this.router.post('/aprobar', indexController_1.default.aprobar);
        this.router.get('/usuarios', indexController_1.default.usuarios);
        this.router.post('/eliminar_recurso', indexController_1.default.eliminar);
        this.router.post('/cargar', indexController_1.default.cargar);
        this.router.post('/descargar', indexController_1.default.descargar);
        this.router.post('/cargar_perfil', indexController_1.default.cargar_perfil);
        this.router.post('/loggeado', indexController_1.default.loggeado);
        this.router.post('/desloggeado', indexController_1.default.desloggeado);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
