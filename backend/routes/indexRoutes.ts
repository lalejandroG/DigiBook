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
        this.router.get('/categoria', indexController.getCategoria);
        this.router.get('/revision', indexController.getRevisiones);
        this.router.post('/busqueda', indexController.getBusqueda);
        this.router.post('/registro', indexController.register);
        this.router.post('/recuperar', indexController.recuperarPsw);
        this.router.post('/profile', indexController.perfil);
        this.router.post('/detalle', indexController.detalle_producto);
        this.router.post('/favorite', indexController.favorite);
        this.router.post('/comments', indexController.comments);
        this.router.post('/edit_profile', indexController.edit_profile);
        this.router.post('/eliminar_fav', indexController.eliminar_favs);
        this.router.post('/agregar_fav', indexController.agregar_favs);
        this.router.post('/comentar', indexController.comentar);
        this.router.post('/aprobar', indexController.aprobar);
        this.router.get('/usuarios', indexController.usuarios);
        this.router.post('/eliminar_recurso', indexController.eliminar);

    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
