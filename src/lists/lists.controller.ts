import { Controller, Get, UseGuards } from "@nestjs/common";
import { Lists } from "./entity/lists.entity";
import { ListsService } from "./lists.service";
import { CoopAuthGuard } from "src/auth/coopAuthService";

@Controller('lists/')
export class ListsController {

    constructor(
        private listsService : ListsService
    ){}
    @Get('list')
    @UseGuards(CoopAuthGuard)
    async findAll():Promise<Array<Lists>>{
        return await this.listsService.findAll();
    }
}