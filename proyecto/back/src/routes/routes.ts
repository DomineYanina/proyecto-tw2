import {Router} from 'express';
import videojuegoRouter from './videojuego-routes/videojuego.routes.js';
import userRouter from './user-routes/user.routes.js';

export class AppRoutes {
    static get routes(): Router{

        const router = Router();

        router.use('/api/videojuego', videojuegoRouter);
        router.use('/api/user', userRouter);

        return router;
    }
}