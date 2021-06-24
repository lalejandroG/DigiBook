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
        this.router.get('/revision', indexController_1.default.getRevisiones);
        this.router.post('/busqueda', indexController_1.default.getBusqueda);
        this.router.post('/registro', indexController_1.default.register);
        this.router.post('/recuperar', indexController_1.default.recuperarPsw);
        this.router.post('/profile', indexController_1.default.perfil);
        this.router.post('/detalle', indexController_1.default.detalle_producto);
        this.router.post('/favorite', indexController_1.default.favorite);
        this.router.post('/comments', indexController_1.default.comments);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
