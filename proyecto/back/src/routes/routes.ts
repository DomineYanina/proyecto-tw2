import {Router} from 'express';
import videojuegoRouter from './videojuego-routes/videojuego.routes.js';
import userRouter from './user-routes/user.routes.js';
import carritoRouter from './carrito-routes/carrito.router.js';
import pedidoRouter from './pedido-routes/pedido.router.js';

export class AppRoutes {
    static get routes(): Router{

        const router = Router();

        router.use('/api/videojuego', videojuegoRouter);
        router.use('/api/user', userRouter);
        router.use('/api/carrito', carritoRouter);
        router.use('/api/pedidos', pedidoRouter); // Asegúrate de tener un pedidoRouter definido

        return router;
    }
}