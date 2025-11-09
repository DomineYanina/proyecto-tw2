import { CarritoRepository } from "../repository/carrito.repository.js";
import type { carrito as Carrito } from '@prisma/client';

export class CarritoService {

    constructor(private carritoRepository: CarritoRepository) {
        }

    async obtenerCarritoPorUsuario(id: number){
        return await this.carritoRepository.findCarritoByUsuario(id);
    }

    async crearItem(data: {userId: number, videojuegoId: number, cantidad: number
        }): Promise<Carrito> {
           
        const itemDataToSave = {
            userId: data.userId,
            videojuegoId: data.videojuegoId, 
            cantidad: data.cantidad,
        }
        
        return await this.carritoRepository.agregarItem(itemDataToSave); 
    }

}