import {Router} from 'express';
import {CarritoController} from '../../controllers/carrito.controller.js';

const carritoRouter = Router();
const carritoController = new CarritoController();

carritoRouter.get('/:id', carritoController.getItems.bind(carritoController));
carritoRouter.post('/:id', carritoController.agregarItem.bind(carritoController));
/*carritoRouter.delete('/:id', carritoController.eliminarItem.bind(carritoController));*/

export default carritoRouter;

