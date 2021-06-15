"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
class Server {
    constructor() {
        //esta funcion aplica el middleware para todas las rutas
        //menos para la ruta indicada en "path"
        this.unless = (path, middleware) => {
            return function (req, res, next) {
                if (path === req.path) {
                    return next();
                }
                else {
                    return middleware(req, res, next);
                }
            };
        };
        this.app = express_1.default();
        dotenv_1.default.config();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 5000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(cors_1.default());
        this.app.options('*', cors_1.default());
    }
    routes() {
        this.app.use(indexRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port`, this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
