export type RolUsuario = 'cliente' | 'administrador';


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

    carrito?: Carrito;
    pedidos_lista?: Pedido[];
}
