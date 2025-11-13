export type RolUsuario = 'cliente' | 'administrador';

// usuario.interface.ts

// import { Carrito } from '../../pedido/interfaces/carrito.interface';
// import { Pedido } from '../../pedido/interfaces/pedido.interface';

export interface UsuarioRegistro {
    email: string;
    contrasena: string;
    usuario: string;
    nombre: string;
    apellido: string;
    direccion: string;
}
//Cree esta clase porque el mapeado del back es distinto
