import { Prisma } from '@prisma/client';
import {prisma} from '../prisma.js';

export class VideojuegoRepository{
    async findAllVideojuegos(){
        return await prisma.videojuego.findMany();
    }

    async findVideojuegoById(id: number){
        return await prisma.videojuego.findUnique({
            where: { id  : id }
        });
    }

    async createVideojuego(data: Prisma.videojuegoCreateInput) {
        return await prisma.videojuego.create({
            data
        });
    }

    async updateVideojuego(id: number, data:{nombre?: string}){
        return await prisma.videojuego.update({
            where: { id : id },
            data
        });
    }
    
    async deleteVideojuego(id: number){
        return await prisma.videojuego.delete({
            where: { id : id }
        });
    }
}