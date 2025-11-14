// Tipos ENUM de PostgreSQL representados como uniones de literales de cadena
export type ClasificacionVideojuego = 'E' | 'T' | 'M' | 'AO' | 'RP';
export type GeneroVideojuego = 'accion' | 'aventura' | 'rpg' | 'estrategia' | 'deportes' | 'simulacion' | 'otros';
export type PlataformaVideojuego = 'pc' | 'playstation' | 'xbox' | 'nintendo' | 'movil';

// Interfaces relacionadas con Videojuego y Requisitos

export interface Desarrollador {
    id: number;
    nombre: string;
}

export interface RequisitosPC {
    id: number;
    so_minimo: string;
    videojuego_id: number; // Corregido de 'videojuego_id_int'
    cpu_minima: string;
    ram_minima: number; // Corregido de 'string' a 'number' (INT en DB)
    gpu_minima: string;
}

// Interfaz para la tabla de Carrito (relación N:M entre Usuario y Videojuego)


// Interfaz principal VIDEOJUEGO
export interface Videojuego {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    id_desarrollador: number; // FK explícita
    fecha_lanzamiento: Date;
    requiere_online: boolean;
    espacio_minimo: number;
    clasificacion: ClasificacionVideojuego; // Usando ENUM Type
    genero: GeneroVideojuego; // Usando ENUM Type
    plataforma: PlataformaVideojuego; // Usando ENUM Type
    url_portada: string;

    // Objetos relacionados (para ser incluidos en la respuesta del backend)
    desarrollador?: Desarrollador;
    requisitos_pc?: RequisitosPC; // Relación 1:1, opcional si no existe
}
