import { Usuario } from '../../usuario/interfaces/usuario.interface';
import { Videojuego } from '../../videojuego/interfaces/videojuego.interface';

export type EstadoPedido = 'pendiente' | 'completado' | 'cancelado';

export interface PedidoVideojuego {
    pedido_id: number;
    videojuego_id: number;
    cantidad: number;
    videojuego?: Videojuego;
}

export interface Pedido {
    id: number;
    usuario_id: number;
    fecha_creacion: Date;
    estado: EstadoPedido; 
    total: number;
    usuario?: Usuario;
    videojuegos?: PedidoVideojuego[]; 
}