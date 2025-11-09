
import { type Request, type Response } from 'express';
import { CarritoService } from '../service/carrito.service.js';
import { CarritoRepository } from '../repository/carrito.repository.js';

const carritoRepository = new CarritoRepository();
const carritoService = new CarritoService(carritoRepository);

export class CarritoController {
    constructor() {
        // Constructor logic here
    }

    public getItems = async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id);
            if(isNaN(id)) {
                return response.status(400).json({ message: 'ID inválido' });
            }
            const carrito = await carritoService.obtenerCarritoPorUsuario(id);

            if(!carrito) {
                return response.status(404).json({ message: 'Carrito no encontrado' });
            }

            response.status(200).json(carrito);
        } catch (error) {
            response.status(500).json({ message: 'No se pudo obtener el carrito', error });
        }
    }

    public agregarItem = async (req: Request, res: Response) => {
        try {
            const { videojuegoId, cantidad } = req.body;
            const userId = Number(req.params.id);
            if (isNaN(userId)) {
                return res.status(400).json({ message: 'ID de usuario inválido' });
            }
            const nuevoItem = await carritoService.crearItem({ userId, videojuegoId, cantidad });
            res.status(201).json(nuevoItem);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error interno';
            res.status(500).json({ message: `Error al agregar item: ${message}` });
        }
    }
}