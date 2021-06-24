import { Router } from 'express';
import indexController from '../controller/indexController';

class IndexRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/login', indexController.login);
        this.router.get('/store', indexController.getRecurso);
        this.router.post('/registro', indexController.register);
        this.router.post('/recuperar', indexController.recuperarPsw);
        this.router.post('/profile', indexController.perfil);
        this.router.post('/detalle', indexController.detalle_producto);
        this.router.post('/favorite', indexController.favorite);
        this.router.post('/comments', indexController.comments);

    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
