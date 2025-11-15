import { Videojuego } from "../../videojuego/interfaces/videojuego.interface";

export interface CarritoItem {
    usuario_id: number;
    videojuego_id: number;
    cantidad: number;
    videojuego?: Videojuego;
}

export interface Carrito {
  items: CarritoItem[];
  total: number;
  cantidadTotal: number;
}