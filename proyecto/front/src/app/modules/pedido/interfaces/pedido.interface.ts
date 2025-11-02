// Mapea la tabla Pedido
export interface Pedido {
  id: number;
  usuario_id: number; // FK de Usuario
  fecha_creacion: Date;
  estado: 'pendiente' | 'pagado' | 'enviado' | 'cancelado'; // Mapea tu campo ENUM
  total: number;

  // Si la API populariza el usuario o los ítems:
  //usuario?: Usuario; 
  items?: PedidoVideojuego[]; // Array de los ítems comprados
}

// Mapea la tabla Videojuego_Pedido (la tabla de unión M:N)
export interface PedidoVideojuego {
  id: number;
  pedido_id: number;
  videojuego_id: number;
  cantidad: number;
  
  // Opcional, si quieres anidar los datos del juego
  //videojuego?: Videojuego; 
}