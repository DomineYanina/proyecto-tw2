import { type Request, type Response } from 'express';
import { PedidoService } from '../service/pedido.service.js';
import { PedidoRepository } from '../repository/pedido.repository.js';

const pedidoRepository = new PedidoRepository();
const pedidoService = new PedidoService(pedidoRepository);

export class PedidoController {
    constructor() {
        // Constructor logic here
    }

    public getItems=async (req: Request, res: Response)=> {
        try {
            const userId = Number(req.params.id);
            if(isNaN(userId)) {
                return res.status(400).json({ message: 'ID inválido' });
            }
            const pedidos = await pedidoService.obtenerPedidosPorUsuario(userId);
            res.status(200).json(pedidos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los pedidos', error });
        }
    }
}