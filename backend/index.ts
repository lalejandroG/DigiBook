import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors'

import indexRoutes from './routes/indexRoutes';
import dotenv from 'dotenv';

class Server {

    public app: Application;

    //esta funcion aplica el middleware para todas las rutas
    //menos para la ruta indicada en "path"
    public unless = (path: any, middleware: any) => {
        return function (req: any, res: any, next: any) {
            if (path === req.path) {
                return next();
            } else {
                return middleware(req, res, next);
            }
        };
    };

    constructor() {
        this.app = express();
        dotenv.config();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 5000);
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        //this.app.use(cors({credentials: true, origin:"http://localhost:3000"}))
        this.app.use(cors({credentials: true, origin:"https://digibook-ffb1b.web.app"}));
    }

    routes(): void {
        this.app.use(indexRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port`, this.app.get('port'));
        });
    }


}

const server = new Server();
server.start();
