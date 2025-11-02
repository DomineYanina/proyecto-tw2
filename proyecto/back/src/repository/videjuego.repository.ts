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
}