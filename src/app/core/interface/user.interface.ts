import { Module } from "./module.interface";

export interface User {
    _id: number;
    name: string;
    email: string;
    number?: string;
    rol: string;
    status: boolean;
}

export interface CreateUser {
    ID: number; 
    PrimerNombre: string;
    SegundoNombre?: string;
    PrimerApellido: string;
    SegundoApellido?: string;
    Matricula: string;
    Correo: string;
    Contrasena?: string;
    Role: string;
}

export interface Usuario {
    ID: number; 
    PrimerNombre: string;
    SegundoNombre?: string;
    PrimerApellido: string;
    SegundoApellido?: string;
    Matricula: string;
    Correo: string;
    Contrasena?: string;
    Rol: string;
    Modulos?: []
}