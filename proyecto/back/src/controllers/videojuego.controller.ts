import { type Request, type Response } from 'express';
import { VideojuegoService } from '../service/videojuego.service.js';
import { VideojuegoRepository } from '../repository/videjuego.repository.js';

const videojuegoRepository = new VideojuegoRepository();
const videojuegoService = new VideojuegoService(videojuegoRepository);

export class VideojuegoController {
    constructor() {
        // Constructor logic here
    }

    public getVideojuegos = async (request: Request, response: Response) => {

        // Logic to get videojuegos
        try {
            const videojuegos = await videojuegoService.obtenerVideojuegos();
            response.status(200).json(videojuegos);
            // Simulate fetching data
        } catch (error) {
            response.status(500).json({ message: 'Error al obtener videojuegos', error });
        }
    }

    public getVideojuego = async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id);
            if(isNaN(id)) {
                return response.status(400).json({ message: 'ID inválido' });
            }
            const videojuego = await videojuegoService.obtenerVideojuego(id);

            if(!videojuego) {
                return response.status(404).json({ message: 'Videojuego no encontrado' });
            }

            response.status(200).json(videojuego);
        } catch (error) {
            response.status(500).json({ message: 'No se pudo obtener el videojuego', error });
        }
    }
}