import { estadopedido, Prisma } from '@prisma/client';
import {prisma} from '../prisma.js';
export class PedidoRepository{

    async agregarItem(data: { 
        pedidoId: number, 
        videojuegoId: number, 
        cantidad: number
    }) {
        // CORRECCIÓN: Usar la sintaxis 'connect' para asociar las relaciones 
        // y asignar 'cantidad' directamente.
        return await prisma.pedidovideojuego.create({
            data: {
                // Relaciona el carrito con el usuario existente usando su ID
                pedido: { 
                    connect: { 
                        id: data.pedidoId 
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

    async crearPedido(data:{
        userId: number,
        fecha_creacion: Date,
        estado: estadopedido,
        total: number
    })  {
        return await prisma.pedido.create({
            data: {
                usuario: { 
                    connect: { 
                        id: data.userId
                    }
                },
                fecha_creacion: data.fecha_creacion,
                estado: data.estado,
                total: data.total
            },
        });
    }

    async findPedidosByUsuarioId(userId: number) {
        return await prisma.pedido.findMany({
            where: {
                usuario_id: userId
            },
            // 🎯 Primer Nivel: Incluimos la tabla intermedia (pedidovideojuego)
            include: {
                pedidovideojuego: { 
                    // 🎯 Segundo Nivel: Dentro de la tabla intermedia, incluimos el modelo Videojuego
                    include: {
                        videojuego: true // Carga todos los campos del Videojuego asociado
                    }
                }
            },
            // Recomendación: Ordenar los pedidos
            orderBy: {
                fecha_creacion: 'desc' 
            }
        });
    }
}