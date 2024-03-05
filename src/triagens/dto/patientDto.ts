import { Procedure } from "../entitys/procedures.entity";

export class PatientDto {
   
    cpf: string;
    
    name: string;

    phone: string;

    dt_birth: Date;

    gender: string;

    civil_state : string;

    resp_name: string;

    profession: string;
    
    locale_work: string;

    address: string;

    district: string;

    city: string;

    procedures: Array<Procedure>
}