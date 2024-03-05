import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Not, Repository } from "typeorm";
import { UserDto } from "./dto/userDto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}
    
    async findAll():Promise<Array<User>>{
        return await this.userRepository.find(
            {   
                select: {
                    name: true,
                    email: true,
                    phone: true,
                    active: true,
                    nivel: true,
                    id: true,
                    login: true
                },
                where: {
                    nivel: Not('s')
                } 
            })
    }

    async findByLogin( login: string):Promise<User>{
        return await this.userRepository.findOne({
            where : {
                login : login
            }
        })
    }

    async update( updateUser: UserDto, id:number):Promise<any>{
        return await this.userRepository.update({id: id }, updateUser)
    }

    async create(userDto: UserDto):Promise<User>{
        return this.userRepository.save(userDto);
    }
}