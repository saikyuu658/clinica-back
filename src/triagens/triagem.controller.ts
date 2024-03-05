import { Controller, Get, Param, Post, Body, Request, UseGuards, BadRequestException } from "@nestjs/common";
import { TriagemService } from "./triagem.service";
import { Procedure } from "./entitys/procedures.entity";
import { Patient } from "./entitys/patients.entity";
import { CoopAuthGuard } from "src/auth/coopAuthService";
import { isEmpty } from "class-validator";
import { StudentAuthGuard } from "src/auth/StudentAuthService";


@Controller('triagem/')
export class TriagemController {

    constructor(
        private triagemService: TriagemService
    ){}
    
    @Get('list')
    @UseGuards(StudentAuthGuard)
    async list(): Promise<Array<Procedure>>{
        return this.triagemService.findAll()
    }
    
    @Get('findPatientByCpf/:cpf')
    @UseGuards(CoopAuthGuard)
    async findPatientByCpf(@Param() cpf: {cpf: string}): Promise<Patient> {
        return await this.triagemService.findPatientByCpf(cpf.cpf);
    }

    @Post('create')
    @UseGuards(CoopAuthGuard)
    async create( @Body() reqBodyPatient: Patient, @Request() req):Promise<Patient>{
        reqBodyPatient.user = req.user.sub
        if(isEmpty(reqBodyPatient.name) || 
            isEmpty(reqBodyPatient.cpf) ||
             isEmpty(reqBodyPatient.phone) 
        ){
            throw new BadRequestException('Preencha o cadastro corretamente');
        }

        try {
            const patients = await this.triagemService.findPatientByCpf(reqBodyPatient.cpf)
            if(!patients){
                return this.triagemService.createPatient(reqBodyPatient);
            }    

            
            patients.user = req.user.sub;
            const deletedId = [];

            
            const tempProceduresPatientExist = patients.procedures.filter(e=>e.status == 'n');
            
            if(tempProceduresPatientExist.length > 0){
                tempProceduresPatientExist.forEach(element => {
                    let cont = 0
                    for (const item of reqBodyPatient.procedures) {
                        if(element.id == item.id){
                            cont = 0;
                            break
                        }else{
                            cont = 1;
                        }
                    }
                    if(cont == 1){
                        console.log(element);
                        deletedId.push(element.id)
                    }
                    
                });
                if(deletedId.length > 0){
                    await this.triagemService.deleteProcedures(deletedId);
                    console.log(`\nForam deletados : ${deletedId.length}\n`)
                }
            }

            patients.procedures.forEach(element => {
                if(element.status == 'a'){
                    reqBodyPatient.procedures.push(element);
                }
            });

            
            return await this.triagemService.createPatient(reqBodyPatient);
            
       } catch (error) {
         return error
       }
    }

    @Post('updateProcedure')
    @UseGuards(CoopAuthGuard)
    async updateProcedure ( @Body() reqBodyProcedure: Procedure ){
        return await this.triagemService.updateProcedure(reqBodyProcedure)
    }




}
