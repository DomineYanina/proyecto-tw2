import {Router} from 'express';
import {VideojuegoController} from '../../controllers/videojuego.controller.js';

const videojuegoRouter = Router();
const videojuegoController = new VideojuegoController();

videojuegoRouter.get('/', videojuegoController.getVideojuegos.bind(videojuegoController));
videojuegoRouter.get('/:id', videojuegoController.getVideojuego.bind(videojuegoController));

export default videojuegoRouter;
