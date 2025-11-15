import { PedidoRepository } from "../repository/pedido.repository.js";
export type EstadoPedido = 'pendiente' | 'completado' | 'cancelado';

export class PedidoService {
    constructor(private pedidoRepository: PedidoRepository) {
            }

    async obtenerPedidosPorUsuario(userId: number){
        return await this.pedidoRepository.findPedidosByUsuarioId(userId);
    }
    
}