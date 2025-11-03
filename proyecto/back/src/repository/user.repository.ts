import {prisma} from "../prisma.js";
export class UserRepository {

    async findAllUsers() {
    return await prisma.usuarios.findMany({
        select: { 
            id_usuario: true,
            nombre: true,
            email: true
        },
      });
    }

    async findUserById(id_usuario: number) {
      return await prisma.usuarios.findUnique({
        where: { id_usuario },
        select: { 
            id_usuario: true,
            nombre: true,
            email: true
        },
      });
    }
   
    //validar mail unico para registro
    async findUserByEmail(email: string) {
      return await prisma.usuarios.findUnique({
        where: { email },
        select: { 
            id_usuario: true,
            nombre: true,
            email: true
        },
      });
    }

    async findPasswordByEmail(email: string) {
        return await prisma.usuarios.findUnique({
            where: { email },
            select: { 
                contrasena: true,
                id_usuario: true
            },
        });
    }

    async createUser(data: { nombre: string; email: string; contrasena: string }) {
      return await prisma.usuarios.create({
        data,
      });
    }

    async updateUser(id_usuario: number, data: { nombre?: string; email?: string; contrasena?: string }) {
      return await prisma.usuarios.update({
        where: { id_usuario },
        data,
      });
    }

    async deleteUser(id_usuario: number) {
      return await prisma.usuarios.delete({
        where: { id_usuario },
      });
    }

    
}
    