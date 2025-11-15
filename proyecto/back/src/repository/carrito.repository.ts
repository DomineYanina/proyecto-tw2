import { prisma } from '../prisma.js';

export class CarritoRepository {

    async findCarritoByUsuario(id: number) {
        return prisma.carrito.findMany({
            where: { usuario_id: id },
            
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


    async deleteItem(itemId: number, userId: number): Promise<number> {
        const resultado = await prisma.carrito.deleteMany({
            where: {
                videojuego_id: itemId,
                usuario_id: userId
            },
        });
        return resultado.count;
    }
}