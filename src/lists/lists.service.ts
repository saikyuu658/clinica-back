import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Lists } from "./entity/lists.entity";
import { Repository } from "typeorm";

@Injectable()

export class ListsService {
    constructor (
        @InjectRepository(Lists)
        private listRepository : Repository<Lists>
    ){}

    async findAll():Promise<Array<Lists>>{
        return await this.listRepository.find({
            order: {
                name: 'ASC'
            }
        });
    }
}