// Ítem individual dentro del carrito
export interface CarritoItem {
  videojuego_id: number;
  nombre: string; // Para mostrar en el carrito sin hacer otra llamada
  precio: number;
  cantidad: number;
  subtotal: number;
}

// Estructura general del Carrito
export interface Carrito {
  items: CarritoItem[];
  total: number;
  cantidadTotal: number;
}