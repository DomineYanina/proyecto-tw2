export type RolUsuario = 'cliente' | 'administrador';

// usuario.interface.ts

import { Carrito } from '../../carrito/interfaces/carrito.interface';
import { Pedido } from '../../pedido/interfaces/pedido.interface';
import { Videojuego } from '../../videojuego/interfaces/videojuego.interface';

export interface Usuario {
    id: number;
    email: string;
    password_hash: string;
    usuario: string;
    rol?: RolUsuario;
    nombre: string;
    apellido: string;
    direccion: string;

    // Relaciones (listas para ser cargadas opcionalmente)
    carrito?: Carrito; // Relación 1:1 (Carrito)
    pedidos_lista?: Pedido[]; // Relación 1:N (Historial de Pedidos)
}
