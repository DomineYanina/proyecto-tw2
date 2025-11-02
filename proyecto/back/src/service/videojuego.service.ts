import { VideojuegoRepository } from "../repository/videjuego.repository.js";

export class VideojuegoService {
    constructor(private videojuegoRepository:VideojuegoRepository) {
    }

    async obtenerVideojuegos(){
        return await this.videojuegoRepository.findAllVideojuegos();
    }

    async obtenerVideojuego(id: number){
        return await this.videojuegoRepository.findVideojuegoById(id);
    }
}