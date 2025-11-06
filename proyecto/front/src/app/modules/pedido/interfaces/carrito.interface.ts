import { Videojuego } from "../../videojuego/interfaces/videojuego.interface";

// Ítem individual dentro del carrito
export interface CarritoItem { // Nombre cambiado para evitar confusión con el concepto de "Carrito" como lista en Usuario
    usuario_id: number;
    videojuego_id: number;
    cantidad: number;
    videojuego?: Videojuego; // Opcional para cargar la información del juego
}

// Estructura general del Carrito
export interface Carrito {
  items: CarritoItem[];
  total: number;
  cantidadTotal: number;
}