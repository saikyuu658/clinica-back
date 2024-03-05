import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Patient } from "./entitys/patients.entity";
import { Procedure } from "./entitys/procedures.entity";
import { TriagemController } from "./triagem.controller";
import { TriagemService } from "./triagem.service";
import { Lists } from "src/lists/entity/lists.entity";
import { ListsController } from "src/lists/lists.controller";
import { ListsService } from "src/lists/lists.service";

@Module({
    imports: [TypeOrmModule.forFeature([Patient, Procedure, Lists])],
    controllers: [TriagemController, ListsController],
    providers: [TriagemService, ListsService]
})
export class TriagemModule{

}