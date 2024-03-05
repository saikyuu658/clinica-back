import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Procedure } from "./procedures.entity";

@Entity()
export class Patient{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 11, nullable: false, unique: true})
    cpf: string;
    
    @Column({type: 'varchar', length: 200, nullable: false})
    name: string;

    @Column({type: 'varchar', length: 11, nullable: false})
    phone: string;

    @Column()
    dt_birth: Date;

    @Column()
    /**
     * m - masculino 
     * f - femenino
     *  - undefined
     */
    gender: string;


    @Column()
    /**
     * a - solteiro 
     * c - casado
     * s - separado
     * d - divorsiado
     * v - viuvo
     */
    civil_state : string;

    @Column({type: 'varchar', length: 200})
    resp_name: string;

    @Column({type: 'varchar', length: 200 })
    profession: string;
    
    @Column({type: 'varchar', length: 200 })
    locale_work: string;

    @Column({type: 'varchar', length: 200 })
    address: string;

    @Column({type: 'varchar', length: 200 })
    district: string;

    @Column({type: 'varchar', length: 200 })
    city: string;

    @OneToMany(()=> Procedure, procedure=>procedure.patient, { nullable: false, cascade: true, onDelete: 'CASCADE'} )
    procedures: Procedure[]

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @Column()
    user: number

    
}