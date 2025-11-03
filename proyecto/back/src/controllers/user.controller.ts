import { type Request, type Response } from 'express';
import { UserService } from '../service/user.service.js';
import { UserRepository } from '../repository/user.repository.js';
import type { User } from '../models/user.model.js';

export class UserController {
    constructor(private userService: UserService = new UserService()) {}

    public findAllUsers = async (req: Request, res: Response): Promise<void> => {
        const users = await this.userService.findAllUsers();
        res.json(users);
    }

    public getUserById = async (req: Request, res: Response) => {
        const id_usuario = Number(req.params.id);
        if (isNaN(id_usuario)) {
            res.status(400).json({ message: 'ID de usuario inválido' });
            return;
        }
        const user = await this.userService.findUserById(id_usuario);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
            
        }
        res.status(200).json(user);
    }

    public createUser = async (req: Request, res: Response) => {
        try {
            const { nombre, email, contrasena, apellido } = req.body;

            const newUser = await this.userService.createUser({ nombre, email, contrasena, apellido});
            res.status(201).json(newUser);
            
        } catch (error) {
            res.status(500).json({ message: 'Error al crear usuario' });
        }
    }
    public updateUser = async (req: Request, res: Response) => {
        const id_usuario = Number(req.params.id);
        const { nombre, email, contrasena } = req.body;

        if (isNaN(id_usuario)) {
            return res.status(400).json({ message: 'ID de usuario inválido' });
        }

        try {
            const updatedUser = await this.userService.updateUser(id_usuario, { nombre, email, contrasena });

            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar usuario' });
        }
    }

    public deleteUser = async (req: Request, res: Response) => {
        const id_usuario = Number(req.params.id);
        if (isNaN(id_usuario)) {
            res.status(400).json({ message: 'ID de usuario inválido' });
            return;
        }
        
        try {
            await this.userService.deleteUser(id_usuario);
            res.status(204).send();
        } catch (error) {
            if (error instanceof Error && error.message === 'Usuario no encontrado') {
                return res.status(404).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Error al eliminar usuario' });
        }
    }
    public login = async (req: Request, res: Response) => {
        
        const { email, contrasena } = req.body;

        try {
            const user = await this.userService.login(email, contrasena);
            res.json(user);
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error) || 'Error de autenticación';
            res.status(401).json({ message });
        }
    }
}
