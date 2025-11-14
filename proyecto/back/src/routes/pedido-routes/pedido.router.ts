import {Router} from 'express';
import {PedidoController} from '../../controllers/pedido.controller.js';

const pedidoRouter = Router();
const pedidoController = new PedidoController();

pedidoRouter.get('/:id', pedidoController.getItems.bind(pedidoController));

export default pedidoRouter;
