import { Patient } from "src/triagens/entitys/patients.entity";

export class UserDto {
    name: string
    
    login: string;

    email: string;
    
    password: string;
    
    nivel: string;

    active: boolean;

    phone : string; 


}