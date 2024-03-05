import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./patients.entity";

export type statusProcedure = "a" | "n";

@Entity()
export class Procedure{

    @PrimaryGeneratedColumn()
    id: number
    
    @Column({type: 'varchar', nullable: false})
    name: string;

    @Column({nullable: false, default: 'n'})
    /**
     * a - agendado 
     * n - não agendado
     */
    status: string;
    
    @Column({type: 'varchar', nullable: true, default: ""})
    element_dental: string;

    @Column({type: 'varchar', nullable: true, default: ""})
    region_dental: string;

    @Column({type: 'varchar', nullable: true, default: ""})
    buccal_cavity: string;

    @CreateDateColumn()
    dt_created: Date;

    @Column({type: 'varchar', length: 200, nullable: false})
    clinic: string;

    @ManyToOne(()=>Patient, (patient)=> patient.procedures, { nullable: false})
    patient: Patient;

}