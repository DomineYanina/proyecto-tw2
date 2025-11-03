export class User {
    id_usuario: number;
    nombre: string;
    email: string ;
    contrasena: string;

    constructor(id_usuario: number, nombre: string, email: string, contrasena: string) {
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.email = email;
        this.contrasena = contrasena;
    }   
}