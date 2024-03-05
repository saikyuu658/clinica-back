import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { Patient } from "./entitys/patients.entity";
import { Procedure } from "./entitys/procedures.entity";

@Injectable()

export class TriagemService {
    constructor(
        @InjectRepository(Patient)
        private patientRepository: Repository<Patient>,

        @InjectRepository(Procedure)
        private procedureRepository: Repository<Procedure>,
    ){}


    async findAll(): Promise<Array<Procedure>>{
        return this.procedureRepository.find( {
            where: {
                status: Not('a')
            },
            select: {
                id: true,
                name: true,
                dt_created: true,
                buccal_cavity: true,
                element_dental: true,
                region_dental: true,
                clinic: true,
                patient : {
                    phone: true,
                    name: true,
                    cpf: true
                }
            },
            
            relations: { patient : true},
        })
    };
    
    async findPatientByCpf(cpf:string): Promise<Patient>{
        return await this.patientRepository.findOne(
            {
                where :{ 
                    cpf : cpf
                }, 
                relations: ['procedures'] 
            }
        )
    }

    async deleteProcedures(ids: number[]): Promise<any> {
     return this.procedureRepository.delete(ids);
    }
    
    async createPatient(patient: Patient):Promise<Patient>{
        return this.patientRepository.save(patient)
    }

    async updateProcedure(procedure : Procedure):Promise<Procedure> {
        return this.procedureRepository.save(procedure);
    }

}