import { Body, Controller, Get, Post, UnauthorizedException, UseGuards, Put, Param, ConflictException, BadRequestException, Request} from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./entity/user.entity";
import { UserDto } from "./dto/userDto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { isEmpty } from "class-validator";
import { AdminAuthGuard } from "src/auth/adminAuthService";
import { StudentAuthGuard } from "src/auth/StudentAuthService";

@Controller('user/')
export class UserController {
    constructor(
        private userService : UserService,
        private jwtService: JwtService
    ){}

    @UseGuards(AdminAuthGuard)
    @Get('list')
    async findAll(): Promise<Array<User>>{
        return this.userService.findAll();
    }

    @Post('create')
    // @UseGuards(AdminAuthGuard)
    async create(@Body() newUser: UserDto): Promise<User>{
        if(isEmpty(newUser.name) || 
            isEmpty(newUser.login) || 
             isEmpty(newUser.password) ||
              isEmpty(newUser.email) || 
               isEmpty(newUser.nivel)){
            throw new BadRequestException('Preencha o cadastro corretamente');
        }
        const queryHasLogin = await this.userService.findByLogin(newUser.login);
        if(queryHasLogin){
            throw new ConflictException('Usuario já existe')
        }
        newUser.password = await bcrypt.hash(newUser.password, 10);
        return this.userService.create(newUser);
    }

    @Put('update/:id')
    @UseGuards(AdminAuthGuard)
    async update(@Param() id: {id: number}, @Body() userUpdate: UserDto ) {

        if(isEmpty(userUpdate.name) || 
            isEmpty(userUpdate.login) || 
                isEmpty(userUpdate.nivel) ||
                    isEmpty(id.id)){
                        
            throw new BadRequestException('Preencha o cadastro corretamente');
        }


        if(userUpdate.password){
            userUpdate.password = await bcrypt.hash(userUpdate.password, 10);
        }
        return this.userService.update(userUpdate, id.id)
    }

    @Post('login')
    async login(@Body() credential: {login: string, password:string}): Promise< { token_acess: string, access: string } | string> {
        try {
            if(credential.login == '' || credential.password == ''){
                throw new UnauthorizedException('Preencha as credenciais corretamente');
            }
            const user = await this.userService.findByLogin(credential.login);
            if(!user){
                throw new UnauthorizedException('Credenciais inválidas')
            }
            if(!bcrypt.compareSync(credential.password, user?.password)){
                throw new UnauthorizedException('credenciais Inválidas')
            }
                
            const payload = {sub: user?.id, username: user?.login, access: user?.nivel}
    
            return {token_acess: await this.jwtService.signAsync(payload), access: user?.nivel };
        
        } catch (error) {
            return error
        }
    }

    @Get('getAccess')
    @UseGuards(StudentAuthGuard)
    async getNivelAccess(@Request() req ): Promise<any>{
        return req.user;
    }



}