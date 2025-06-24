import { Injectable } from "@angular/core";
import { User } from "@Interface/user.interface";

@Injectable({ providedIn: 'root' })
export class UserService {
    private readonly dummyUsers: User[] = [
        {
            _id: 0,
            name: 'Jonathan Martinez Zavala',
            email: '0322103758@ut-tijuana.edu.mx',
            number: '0322103758',
            rol: 'Desarrollador',
        },
        {
            _id: 1,
            name: 'Andrea Guadalupe Quintana Zepeda',
            email: '0322103758@ut-tijuana.edu.mx',
            number: '03221037593',
            rol: 'Desarrollador',
        },
        {
            _id: 2,
            name: 'Juan Antonio Avalos Garcia',
            email: '0322103758@ut-tijuana.edu.mx',
            number: '0322103758',
            rol: 'Desarrollador',
        },
        {
            _id: 3,
            name: 'Miguel Isaac Garcia Lopez',
            email: '0322103717@ut-tijuana.edu.mx',
            number: '0322103717',
            rol: 'Desarrollador',
        },
        {
            _id: 4,
            name: 'José De Jesús Ponce Duarte',
            email: '0322103790@ut-tijuana.edu.mx',
            number: '0322103790',
            rol: 'Desarrollador',
        },
        {
            _id: 5,
            name: 'Cesia Nuemi Ochoa Huerta',
            email: '0322103758@ut-tijuana.edu.mx',
            number: '0322103758',
            rol: 'Desarrollador',
        },
    ] as const;

    getDummyUsers(): User[] {
        return this.dummyUsers
    }
}