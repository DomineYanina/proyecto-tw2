import { Prisma } from '@prisma/client';
import { prisma } from '../prisma.js';

export class VideojuegoRepository{
    async findAllVideojuegos(filtros?: {
        nombre?: string;
        clasificacion?: string;
        precioMin?: number;
        precioMax?: number;
    }){
        const where: Prisma.videojuegoWhereInput = {};

        if (filtros?.nombre) {
            where.nombre = {
                contains: filtros.nombre,
                mode: 'insensitive'
            };
        }

        if (filtros?.clasificacion) {
            where.clasificacion = filtros.clasificacion as any;
        }

        if (filtros?.precioMin !== undefined) {
            where.precio = {
                ...where.precio,
                gte: filtros.precioMin
            };
        }

        if (filtros?.precioMax !== undefined) {
            where.precio = {
                ...where.precio,
                lte: filtros.precioMax
            };
        }

        return await prisma.videojuego.findMany({
            where,
            orderBy: {
                nombre: 'asc'
            }
        });
    }

    async findVideojuegoById(id: number){
        return await prisma.videojuego.findUnique({
            where: { id  : id }
        });
    }


    async findRequisitosPCByVideojuegoId(id: number) {
        return await prisma.requisitos_pc.findUnique({
            where: { videojuego_id: id }
        });
    }

    async findDesarrolladorByVideojuegoId(id: number) {
        return await prisma.desarrollador.findUnique({
            where: { id: id }
        });
    }





}