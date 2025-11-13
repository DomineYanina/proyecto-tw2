
import { request, type Request, type Response } from 'express';
import { CarritoService } from '../service/carrito.service.js';
import { CarritoRepository } from '../repository/carrito.repository.js';
import { PedidoRepository } from '../repository/pedido.repository.js';



const carritoRepository = new CarritoRepository();
const pedidoRepository = new PedidoRepository();
const carritoService = new CarritoService(carritoRepository, pedidoRepository);



export class CarritoController {
    constructor() {
        // Constructor logic here
    }

    public getItems = async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id);
            if (isNaN(id)) {
                return response.status(400).json({ message: 'ID inválido' });
            }
            const carrito = await carritoService.obtenerCarritoPorUsuario(id);

            if (!carrito) {
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

    public realizarCompra = async (req: Request, res: Response) => {
        try {
            // 1. Lee la propiedad userId directamente del cuerpo.
            const { id: userIdStr } = req.params;

            const userId = Number(userIdStr);

            // 3. Valida el número resultante.
            if (isNaN(userId) || userId <= 0) {
                console.error('ID recibido:', userId);
                return res.status(400).json({ message: 'ID de usuario inválido en el cuerpo de la solicitud' });
            }

            const pedido = await carritoService.realizarCompra(userId);

            if (!pedido || !pedido.id) {
                throw new Error('El servicio de compra no devolvió un objeto de pedido válido.');
            }

            res.status(201).json({
                message: 'Compra realizada con éxito. Carrito vaciado.',
                pedidoId: pedido.id
            });
        } catch (error) {
            console.error('⚠️ Error al intentar realizar la compra:', error);
            const message = error instanceof Error ? error.message : 'Error interno';
            res.status(500).json({
                message: `Error al procesar la compra: ${message}`
            });
        }
    }

    public eliminarItem = async (req: Request, res: Response) => {
        try {

            // 1. Obtener el ID del ítem de carrito a eliminar. 
            // Asumimos que la ruta es /api/carrito/item/:itemId o similar.
            const { itemId } = req.params;
            const itemIdNum = Number(itemId);

            // 2. Validar que el ID sea un número válido.
            if (isNaN(itemIdNum) || itemIdNum <= 0) {
                return res.status(400).json({ message: 'ID del ítem de carrito inválido' });
            }

            // 3. Llamar al servicio para realizar la eliminación en la base de datos.
            // Asumimos que el CarritoService tiene un método 'eliminarItemDelCarrito'.
            const resultado = await carritoService.eliminarItem(itemIdNum);

            // 4. Comprobar si la eliminación fue exitosa (ej. 1 fila afectada, o una respuesta de éxito).
            // La lógica exacta puede variar dependiendo de lo que devuelva el repositorio/servicio.
            //if (!resultado) {
                // Si el servicio devuelve null o false si el ítem no existía.
               // return res.status(404).json({ message: `Ítem de carrito con ID ${itemIdNum} no encontrado.` });
            //}

            // 5. Respuesta exitosa (HTTP 204 No Content es estándar para DELETE exitoso sin devolver body, 
            // pero 200/202 con mensaje también es común). Usaremos 204 para ser canónicos.
            res.status(204).send();
        }
        catch (error) {
            console.error('⚠️ Error al intentar eliminar el item:', error);
            const message = error instanceof Error ? error.message : 'Error interno';
            res.status(500).json({
                message: `Error al eliminar el juego: ${message}`
            });
        }
    }
}