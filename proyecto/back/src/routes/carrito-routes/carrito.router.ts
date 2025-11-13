import {Router} from 'express';
import {CarritoController} from '../../controllers/carrito.controller.js';

const carritoRouter = Router();
const carritoController = new CarritoController();

carritoRouter.get('/:id', carritoController.getItems.bind(carritoController));
carritoRouter.post('/agregar/:id', carritoController.agregarItem.bind(carritoController));
carritoRouter.post('/compra/:id', carritoController.realizarCompra.bind(carritoController));
/*carritoRouter.delete('/:id', carritoController.eliminarItem.bind(carritoController));*/

export default carritoRouter;

