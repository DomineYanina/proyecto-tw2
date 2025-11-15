import { VideojuegoRepository } from "../repository/videjuego.repository.js";

export class VideojuegoService {
    constructor(private videojuegoRepository:VideojuegoRepository) {
    }

    async obtenerVideojuegos(filtros?: {
        nombre?: string;
        clasificacion?: string;
        precioMin?: number;
        precioMax?: number;
    }){
        return await this.videojuegoRepository.findAllVideojuegos(filtros);
    }

    async obtenerVideojuego(id: number){
        return await this.videojuegoRepository.findVideojuegoById(id);
    }

    async obtenerRequisitosPC(id: number){
        return await this.videojuegoRepository.findRequisitosPCByVideojuegoId(id);
    }

    async obtenerDesarrollador(id: number){
        return await this.videojuegoRepository.findDesarrolladorByVideojuegoId(id);
    }


 
}