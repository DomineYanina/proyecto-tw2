import { UserRepository } from '../repository/user.repository.js';
import * as bcrypt from 'bcrypt';

import type { usuario as User } from '@prisma/client';

export class UserService {
    private userRepository: UserRepository;

    constructor() {

        this.userRepository = new UserRepository();
    }

    async findUserById(id: number) {
        return await this.userRepository.findUserById(id);
    }

    async createUser(data: {
        nombre: string;
        apellido: string;
        email: string;
        usuario: string;
        direccion: string;
        contrasena: string;
    }): Promise<User> {

      
        const hashedPassword = await bcrypt.hash(data.contrasena, 10);

        const userDataToSave = {
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            usuario: data.usuario,
            direccion: data.direccion,
            password_hash: hashedPassword
        };

        try {
            this.validacionMail(data.email);
            this.validacionPass(data.contrasena);
            return await this.userRepository.createUser(userDataToSave);
        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new Error('usuario Existente')
            }
            throw error;
        }
    }

    public validacionMail(mail: string) {
        const emailPatron = /^[^\s@]+@[^\s@]+$/;
        if (!emailPatron.test(mail)) {
            throw new Error("mail Invalido");
        }
    }

    public validacionPass(password: string) {
        const passPatron = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{5,}/;
        if (!passPatron.test(password)) {
            throw new Error("password Invalida")
        }
    }

    async updateUser(id: number, data: {
        nombre?: string;
        email?: string;
        usuario?: string;
        apellido?: string;
        direccion?: string;
        contrasena?: string;
    }) {
        let dataToUpdate: any = { ...data };


        if (data.contrasena) {
            const hashedPassword = await bcrypt.hash(data.contrasena, 10);
            dataToUpdate.password_hash = hashedPassword;
            delete dataToUpdate.contrasena;
        }

        return await this.userRepository.updateUser(id, dataToUpdate);
    }

    async login(email: string, contrasenaPlana: string) {

        const userPasswordData = await this.userRepository.findPasswordByEmail(email);

        if (!userPasswordData) {
            throw new Error('Credenciales inválidas');
        }


        const isMatch = await bcrypt.compare(contrasenaPlana, userPasswordData.password_hash);

        if (!isMatch) {
            throw new Error('Credenciales inválidas');
        }

        return await this.userRepository.findUserById(userPasswordData.id);
    }
}