import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class StudentAuthGuard implements CanActivate{

    constructor(
        private jwtService: JwtService
    ){}
    async canActivate(context: ExecutionContext):Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
        throw new UnauthorizedException("Usuário não logado");
        }
        try {
        const payload = await this.jwtService.verifyAsync(
            token,
            {
                secret: process.env.SECRET_JWT
            }
        );

        
        request['user'] = payload;
        } catch(error ){
            throw new UnauthorizedException(error);
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}