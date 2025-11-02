//Interfaces relacionadas con el videojuego

export interface Desarrollador{
    id: number;
    nombre: string;
}

export interface Genero{
    id: number;
    nombre: string;
}

export interface Edad{
    id: number;
    edad: number;
}

export interface Clasificacion{
    id: number;
    id_genero:number;
    id_edad:number;
    genero?: Genero;
    edad?: Edad;
}

//Interfaces para los requisitos

export interface Plataforma{
    id: number;
    nombre: string;
}

export interface RequisitosPC{
    id: number;
    so_minimo: string;
    videojuego_id_int: number;
    cpu_minima: string;
    ram_minima: string;
    gpu_minima: string;
}

export interface RequisitosConsola{
    id: number;
    videojuego_id_int: number;
    plataforma_id_int: number;
    espacio_minimo_int: number;
    requiere_online: boolean;
    plataforma?: Plataforma;
}

//Interfaz principal VIDEOJUEGO

export interface Videojuego{
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    fecha_lanzamiento: Date;
    desarrollador?: Desarrollador;
    clasificacion?: Clasificacion;
    requisitos_pc?: RequisitosPC;
    requisitos_consola?: RequisitosConsola;
}