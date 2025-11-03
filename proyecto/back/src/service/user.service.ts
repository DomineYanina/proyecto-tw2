import type{ User } from '../models/user.model.js';
import { UserRepository } from '../repository/user.repository.js';
import bcrypt from 'bcrypt';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async findAllUsers(){
        return await this.userRepository.findAllUsers();
    }

    async findUserById(id_usuario: number){
        return await this.userRepository.findUserById(id_usuario);
    }

    async createUser(data: { nombre: string; email: string; contrasena: string; apellido: string }): Promise<User> {
       
        const hashedPassword = await bcrypt.hash(data.contrasena, 10);
        const userDataToSave = {
            ...data,  
            contrasena: hashedPassword 
        };
        return await this.userRepository.createUser(userDataToSave);
    }

    async updateUser(id_usuario: number, data: { nombre?: string; email?: string; contrasena?: string }){
        return await this.userRepository.updateUser(id_usuario, data);
    }

    async deleteUser(id_usuario: number): Promise<User | null> {
        return await this.userRepository.deleteUser(id_usuario);
    }

    async login(email: string, contrasenaPlana: string) {
        const userPasswordData = await this.userRepository.findPasswordByEmail(email);

        if (!userPasswordData) {
            throw new Error('Credenciales inválidas');
        }

        const isMatch = await bcrypt.compare(contrasenaPlana, userPasswordData.contrasena);

        if (!isMatch) {
            throw new Error('Credenciales inválidas');
        }

        return await this.userRepository.findUserById(userPasswordData.id_usuario); 
    }
}
