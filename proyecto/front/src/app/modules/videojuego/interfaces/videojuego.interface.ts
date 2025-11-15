
export type ClasificacionVideojuego = 'E' | 'T' | 'M' | 'AO' | 'RP';
export type GeneroVideojuego = 'accion' | 'aventura' | 'rpg' | 'estrategia' | 'deportes' | 'simulacion' | 'otros';
export type PlataformaVideojuego = 'pc' | 'playstation' | 'xbox' | 'nintendo' | 'movil';



export interface Desarrollador {
    id: number;
    nombre: string;
}

export interface RequisitosPC {
    id: number;
    so_minimo: string;
    videojuego_id: number;
    cpu_minima: string;
    ram_minima: number;
    gpu_minima: string;
}



export interface Videojuego {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    id_desarrollador: number;
    fecha_lanzamiento: Date;
    requiere_online: boolean;
    espacio_minimo: number;
    clasificacion: ClasificacionVideojuego;
    genero: GeneroVideojuego;
    plataforma: PlataformaVideojuego;
    url_portada: string;

    desarrollador?: Desarrollador;
    requisitos_pc?: RequisitosPC;
}
