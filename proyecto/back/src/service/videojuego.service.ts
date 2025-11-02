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

    async crearVideojuego(data:{[nombre: string]:any}){
        const{nombre} = data;
        if(!nombre|| typeof nombre !== 'string'){
            throw new Error('El nombre del videojuego es obligatorio y debe ser una cadena.');
        }
        return await this.videojuegoRepository.createVideojuego({nombre});
    }

    async actualizarVideojuego(id: number, data:{[nombre: string]:any}){
        return await this.videojuegoRepository.updateVideojuego(id, data);
    }

    async eliminarVideojuego(id: number){
        try {
            return await this.videojuegoRepository.deleteVideojuego(id);
        } catch (error) {
            throw new Error('Error al eliminar el videojuego');
        }
    }

}