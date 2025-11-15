import { estadopedido} from '@prisma/client';
import {prisma} from '../prisma.js';
export class PedidoRepository{

    async agregarItem(data: { 
        pedidoId: number, 
        videojuegoId: number, 
        cantidad: number
    }) {
        
        return await prisma.pedidovideojuego.create({
            data: {
                
                pedido: { 
                    connect: { 
                        id: data.pedidoId 
                    } 
                },
                
                videojuego: { 
                    connect: { 
                        id: data.videojuegoId 
                    } 
                },
                
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
            
            include: {
                pedidovideojuego: { 
                    
                    include: {
                        videojuego: true
                    }
                }
            },
            
            orderBy: {
                fecha_creacion: 'desc' 
            }
        });
    }
}