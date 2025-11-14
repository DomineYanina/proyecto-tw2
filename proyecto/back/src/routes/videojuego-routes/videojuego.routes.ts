import {Router} from 'express';
import {VideojuegoController} from '../../controllers/videojuego.controller.js';

const videojuegoRouter = Router();
const videojuegoController = new VideojuegoController();

videojuegoRouter.get('/', videojuegoController.getVideojuegos.bind(videojuegoController));
videojuegoRouter.get('/:id', videojuegoController.getVideojuego.bind(videojuegoController));
videojuegoRouter.get('/:id/requisitos-pc', videojuegoController.getRequisitosPC.bind(videojuegoController));
videojuegoRouter.get('/desarrollador/:id', videojuegoController.getDesarrollador.bind(videojuegoController));




export default videojuegoRouter;
