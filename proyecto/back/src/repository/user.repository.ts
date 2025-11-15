import {prisma} from "../prisma.js";
import { rolusuario } from "@prisma/client";

export class UserRepository {


    async findUserById(id: number) { 
        return await prisma.usuario.findUnique({
            where: { id },                     
            select: { 
                id: true,                      
                nombre: true,
                email: true,
                usuario: true,  
                apellido: true,
                direccion: true              
            },
        });
    }
    
    
    async findUserByEmail(email: string) {
        return await prisma.usuario.findUnique({
            where: { email },
            select: { 
                id: true,                      
                nombre: true,
                email: true,
                usuario: true,                 
            },
        });
    }

    async findPasswordByEmail(email: string) {
        return await prisma.usuario.findUnique({
            where: { email },
            select: { 
                password_hash: true,           
                id: true                       
            },
        });
    }

    
    async createUser(data: { 
        nombre: string; 
        apellido: string; 
        email: string; 
        usuario: string; 
        password_hash: string; 
        direccion: string; 
        rol?: rolusuario;
    }) {
        return await prisma.usuario.create({
            data,
        });
    }

    async updateUser(id: number, data: { 
        nombre?: string; 
        email?: string; 
        password_hash?: string; 
        usuario?: string; 
        apellido?: string;
        direccion?: string; 
        //rol?: rolusuario;
    }) {
        return await prisma.usuario.update({
            where: { id },                     
            data,
            select: { 
                id: true,                      
                nombre: true,
                email: true,
                apellido: true,
                usuario: true,
                direccion: true,
                rol: true,
            },
        });
    }
    
}
    