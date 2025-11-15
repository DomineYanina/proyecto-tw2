export type RolUsuario = 'cliente' | 'administrador';

export interface UsuarioRegistro {
    email: string;
    contrasena: string;
    usuario: string;
    nombre: string;
    apellido: string;
    direccion: string;
}
