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
    firstName: string;
    middleName: string;
    lastName: string;
    secondLastName: string;
    email: string;
    employeeId: string;
    password: string;
    rol: string;
    modules: Module[]
}
