import {Router} from 'express';
import {VideojuegoController} from '../../controllers/videojuego.controller.js';

const videojuegoRouter = Router();
const videojuegoController = new VideojuegoController();

videojuegoRouter.get('/', videojuegoController.getVideojuegos.bind(videojuegoController));
videojuegoRouter.get('/:id', videojuegoController.getVideojuego.bind(videojuegoController));
videojuegoRouter.post('/', videojuegoController.crearVideojuego.bind(videojuegoController));
videojuegoRouter.put('/:id', videojuegoController.actualizarVideojuego.bind(videojuegoController));
videojuegoRouter.delete('/:id', videojuegoController.eliminarVideojuego.bind(videojuegoController));

export default videojuegoRouter;
