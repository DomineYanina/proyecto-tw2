import { PedidoRepository } from "../repository/pedido.repository.js";
export type EstadoPedido = 'pendiente' | 'completado' | 'cancelado';
import type { carrito as Carrito } from '@prisma/client';

export class PedidoService {
    constructor(private pedidoRepository: PedidoRepository) {
            }

    async obtenerPedidosPorUsuario(userId: number){
        return await this.pedidoRepository.findPedidosByUsuarioId(userId);
    }

    
}