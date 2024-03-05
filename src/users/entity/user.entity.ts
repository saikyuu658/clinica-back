import { Patient } from "src/triagens/entitys/patients.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 100, nullable: false})
    name: string

    @Column({ type: 'varchar', length: 50, unique: true,  nullable: false})
    login: string;

    @Column({ type: 'varchar', length: 100, unique: true,  nullable: false})
    email: string;

    @Column({ type: 'varchar', nullable: false})
    password: string;

    @Column({ type: 'varchar', length: 13 })
    phone: string;

    @Column({ default: true, nullable: false})
    active: boolean

    @Column({ nullable: false })
  /**
   * a - aluno
   * f - funcionario
   * p - professor
   * s - admin
   */
    nivel: string;

  }
