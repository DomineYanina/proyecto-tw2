import { Prisma } from '@prisma/client';
import { prisma } from '../prisma.js';

export class CarritoRepository {

    async findCarritoByUsuario(id: number) {
        return prisma.carrito.findMany({
            where: { usuario_id: id },
            // Incluye la data del videojuego en cada ítem del carrito
            include: {
                videojuego: true
            }
        });
    }

    async agregarItem(data: {
        userId: number,
        videojuegoId: number,
        cantidad: number
    }) {
        
        return await prisma.carrito.create({
            data: {
                
                usuario: {
                    connect: {
                        id: data.userId
                    }
                },
                videojuego: {
                    connect: {
                        id: data.videojuegoId
                    }
                },
                // Asigna el campo de cantidad
                cantidad: data.cantidad
            },
        });
    }

    async vaciarCarritoPorUsuario(userId: number) {
        return prisma.carrito.deleteMany({
            where: { usuario_id: userId }
        });
    }


    async deleteItem(itemId: number, userId: number): Promise<number> { // itemId = videojuego_id
        const resultado = await prisma.carrito.deleteMany({
            where: {
                videojuego_id: itemId,
                usuario_id: userId
            },
        });
        return resultado.count;
    }
}