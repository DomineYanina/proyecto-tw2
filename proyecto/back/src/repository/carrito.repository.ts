import { Prisma } from '@prisma/client';
import {prisma} from '../prisma.js';

export class CarritoRepository{

    async findCarritoByUsuario(id: number){
        return prisma.carrito.findMany({
            where: { usuario_id: id }
        });
    }

    async agregarItem(data: { 
        userId: number, 
        videojuegoId: number, 
        cantidad: number
    }) {
        // CORRECCIÓN: Usar la sintaxis 'connect' para asociar las relaciones 
        // y asignar 'cantidad' directamente.
        return await prisma.carrito.create({
            data: {
                // Relaciona el carrito con el usuario existente usando su ID
                usuario: { 
                    connect: { 
                        id: data.userId 
                    } 
                },
                // Relaciona el carrito con el videojuego existente usando su ID
                videojuego: { 
                    connect: { 
                        id: data.videojuegoId 
                    } 
                },
                // Asigna el campo de cantidad
                cantidad: data.cantidad,
            },
        });
    }
   /*async getItems(userId: number) {
       return prisma.carrito.findMany({
           where: { userId },
           include: { videojuego: true }
       });
   }

   async agregarItem(userId, videojuegoId, cantidad) {
       return prisma.carrito.create({
           data: {
               userId,
               videojuegoId,
               cantidad
           }
       });
   }

   async eliminarItem(id) {
       return prisma.carrito.delete({
           where: { id }
       });
   }*/
}