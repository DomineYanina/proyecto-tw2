import { type Request, type Response } from 'express';
import { UserService } from '../service/user.service.js';
import type { usuario as User } from '@prisma/client';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'mi_clave_secreta'; // ⚠️ en producción usar process.env.JWT_SECRET

export class UserController {

    constructor(private userService: UserService = new UserService()) { }

    public findAllUsers = async (req: Request, res: Response): Promise<void> => {
        const users = await this.userService.findAllUsers();
        res.json(users);
    }

    public getUserById = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID de usuario inválido' });
        }

        const user = await this.userService.findUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    }

    public createUser = async (req: Request, res: Response) => {
        try {
            this.hayCamposVacios(req);
            const { nombre, apellido, email, usuario, direccion, contrasena } = req.body;
            const newUser = await this.userService.createUser({ nombre, apellido, email, usuario, direccion, contrasena });
            res.status(201).json(newUser);

        } catch (error) {
            if (error && error instanceof Error) {
                res.status(400).json({
                    message: `Error al crear usuario: ${error.message}`,
                    tipo: error.message
                });
            } else {
                const message = error instanceof Error ? error.message : 'Error interno';
                res.status(500).json({ message: `Error al crear usuario: ${message}` });
            }
        }
    }

    public hayCamposVacios(req: Request<any, Record<string, any>>) {
        let contenido: any = Object.values(req.body);
        for (const value of contenido) {
            if (!value || value.toString() == "") {
                throw new Error("camposVacios");;
            }
        }
    }


    public updateUser = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const { nombre, email, contrasena, apellido, usuario, direccion } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID de usuario inválido' });
        }

        try {
            const updateData = { nombre, email, contrasena, apellido, usuario, direccion };
            const updatedUser = await this.userService.updateUser(id, updateData);

            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error interno';
            res.status(500).json({ message: `Error al actualizar usuario: ${message}` });
        }
    }

    public deleteUser = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID de usuario inválido' });
        }

        try {
            await this.userService.deleteUser(id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof Error && error.message.includes('No existe el usuario')) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            return res.status(500).json({ message: 'Error al eliminar usuario' });
        }
    }

    public login = async (req: Request, res: Response) => {
        const { email, contrasena } = req.body;

        try {
            const user = await this.userService.login(email, contrasena);

            if (!user) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    nombre: user.nombre,
                },
                SECRET_KEY,
                { expiresIn: '2h' }
            );

            res.status(200).json({
                message: 'Login exitoso',
                token,
                user: {
                    id: user.id,
                    nombre: user.nombre,
                    email: user.email,
                },
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error de autenticación';
            res.status(401).json({ message });
        }
    };

}