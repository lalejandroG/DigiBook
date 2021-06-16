import { Router } from 'express';
import indexController from '../controller/indexController';

class IndexRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/login', indexController.login);
        this.router.post('/registro', indexController.register);
        this.router.post('/recuperar', indexController.recuperarPsw);
        this.router.post('/profile', indexController.perfil);
        this.router.post('/detalle', indexController.detalle_producto);
        this.router.post('/favorite', indexController.favorite);

    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
