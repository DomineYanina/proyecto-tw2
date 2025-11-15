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
        
        const carritoItems = await this.carritoRepository.findCarritoByUsuario(userId);

        if (carritoItems.length === 0) {
            throw new Error('El carrito está vacío. No se puede realizar la compra.');
        }

        const totalCompra = carritoItems.reduce((sum, item) => {
            return sum + (item?.videojuego?.precio ?? 0) * item.cantidad;
        }, 0);

        const nuevoPedido = await this.pedidoRepository.crearPedido({
            userId: userId,
            fecha_creacion: new Date(),
            estado: 'pendiente',
            total: totalCompra
        });

        for (const item of carritoItems) {
            await this.pedidoRepository.agregarItem({
                pedidoId: nuevoPedido.id,
                videojuegoId: item.videojuego_id,
                cantidad: item.cantidad
            });
        }

        await this.carritoRepository.vaciarCarritoPorUsuario(userId);

        return nuevoPedido;
    }

    async eliminarItem(itemId: number, userId: number) {
        try {
            
            const resultado = await this.carritoRepository.deleteItem(itemId, userId);
            
            if (resultado === 0) {
                
                throw new Error(`Ítem de carrito con videojuego ID ${itemId} y usuario ID ${userId} no encontrado.`);
            }
            return resultado;
        } catch (error) {
            console.error(`Error en CarritoService al eliminar item ${itemId}:`, error);
            throw error;
        }
    }

}