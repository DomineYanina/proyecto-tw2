import { type Request, type Response } from 'express';
import { VideojuegoService } from '../service/videojuego.service.js';
import { VideojuegoRepository } from '../repository/videjuego.repository.js';

const videojuegoRepository = new VideojuegoRepository();
const videojuegoService = new VideojuegoService(videojuegoRepository);

export class VideojuegoController {
    service: any;
    constructor() {
        
    }

    public getVideojuegos = async (request: Request, response: Response) => {
        try {
            const { nombre, clasificacion, precioMin, precioMax } = request.query;
            
            const filtros = {
                nombre: nombre as string,
                clasificacion: clasificacion as string,
                precioMin: precioMin ? Number(precioMin) : undefined,
                precioMax: precioMax ? Number(precioMax) : undefined
            };

            const videojuegos = await videojuegoService.obtenerVideojuegos(filtros);
            response.status(200).json(videojuegos);
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


    public getRequisitosPC = async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id);
            if(isNaN(id)) {
                return response.status(400).json({ message: 'ID inválido' });
            }
            const requisitosPC = await videojuegoService.obtenerRequisitosPC(id);
            if (!requisitosPC) {
                return response.status(404).json({ message: 'Requisitos no encontrados' });
            }
            response.status(200).json(requisitosPC);
        } catch (error) {
            response.status(500).json({ message: 'Error al obtener los requisitos de PC', error });
        }
    }

    public getDesarrollador = async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id);
            if(isNaN(id)) {
                return response.status(400).json({ message: 'ID inválido' });
            }
            const desarrollador = await videojuegoService.obtenerDesarrollador(id);
            if (!desarrollador) {
                return response.status(404).json({ message: 'Desarrollador no encontrado' });
            }
            response.status(200).json(desarrollador);
        } catch (error) {
            response.status(500).json({ message: 'Error al obtener el desarrollador', error });
        }
    }

}
