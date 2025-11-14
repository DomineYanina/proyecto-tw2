import { CarritoRepository } from "../repository/carrito.repository.js";
export type EstadoPedido = 'pendiente' | 'completado' | 'cancelado';
import type { carrito as Carrito } from '@prisma/client';
import type { PedidoRepository } from "../repository/pedido.repository.js";

export class CarritoService {

    constructor(private carritoRepository: CarritoRepository, private pedidoRepository: PedidoRepository) {
    }

    async obtenerCarritoPorUsuario(id: number) {
        return await this.carritoRepository.findCarritoByUsuario(id);
    }

    async crearItem(data: {
        userId: number, videojuegoId: number, cantidad: number
    }): Promise<Carrito> {

        const itemDataToSave = {
            userId: data.userId,
            videojuegoId: data.videojuegoId,
            cantidad: data.cantidad,
        }

        return await this.carritoRepository.agregarItem(itemDataToSave);
    }

    async realizarCompra(userId: number) {
        // 1. Obtener los ítems del carrito (incluye el videojuego completo gracias a la corrección previa)
        console.log('1. Buscando items del carrito para:', userId);
        const carritoItems = await this.carritoRepository.findCarritoByUsuario(userId);

        if (carritoItems.length === 0) {
            throw new Error('El carrito está vacío. No se puede realizar la compra.');
        }

        console.log('2. Calculando total y creando pedido...');
        // 2. Calcular el total
        const totalCompra = carritoItems.reduce((sum, item) => {
            // Asume que item.videojuego.precio es el precio del juego
            return sum + (item?.videojuego?.precio ?? 0) * item.cantidad;
        }, 0);

        // 3. Usar la transacción de Prisma para garantizar atomicidad
        const nuevoPedido = await this.pedidoRepository.crearPedido({
            userId: userId,
            fecha_creacion: new Date(),
            estado: 'pendiente',
            total: totalCompra
        });

        console.log('3. Agregando items de pedido...');
        for (const item of carritoItems) {
            await this.pedidoRepository.agregarItem({
                pedidoId: nuevoPedido.id,
                videojuegoId: item.videojuego_id,
                cantidad: item.cantidad
            });
        }

        await this.carritoRepository.vaciarCarritoPorUsuario(userId);

        console.log('4. Carrito vaciado. Terminando servicio.');
        return nuevoPedido;
    }
    async eliminarItem(itemId: number) {
        try {
            // 1. Llamar al repositorio para ejecutar la eliminación por el ID del ítem.
            // Asumimos que carritoRepository tiene un método 'deleteItem' que recibe el ID.
            const resultado = await this.carritoRepository.deleteItem(itemId);

            // 2. Opcional: Manejo de caso donde el ítem no existe. 
            // Si el repositorio devuelve 0 filas afectadas, puedes lanzar un error.
            if (resultado === 0) {
                // Lanzar un error específico que el controlador pueda capturar (404)
                throw new Error(`Ítem de carrito con ID ${itemId} no encontrado.`);
            }

            // 3. Devolver el resultado de la operación.
            // Esto es lo que el controlador verificará (aunque ya quitamos el 'if' allí, 
            // es bueno que el servicio devuelva algo útil).
            return resultado;
        } catch (error) {
            console.error(`Error en CarritoService al eliminar item ${itemId}:`, error);
            // Re-lanzar el error para que el bloque 'catch' del controlador lo maneje.
            throw error;
        }
    }

}