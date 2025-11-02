import {Router} from 'express';
import videojuegoRouter from './videojuego-routes/videojuego.routes.js';

export class AppRoutes {
    static get routes(): Router{

        const router = Router();

        router.use('/api/videojuego', videojuegoRouter);

        return router;
    }
}