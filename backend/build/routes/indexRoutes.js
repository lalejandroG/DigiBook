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
        this.router.post('/registro', indexController_1.default.register);
        this.router.post('/recuperar', indexController_1.default.recuperarPsw);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;