import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lists {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    name: string;

    @Column()

    /*  Tipos de listas
    * 'p', 'b', 'c' , 'd', 'r'
    */
    type: string;
}
