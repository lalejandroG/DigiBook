import { Router } from 'express';
import indexController from '../controller/indexController';

class IndexRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/login', indexController.login);
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
