import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwt_const } from './auth/AuthConstJwt';
import { TriagemModule } from './triagens/triagem.module';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: '@cessoFLFnti',
      database: 'clinica',
      options: {
        encrypt: false, // MSSQL-specific option
      },
      synchronize: true,
      logging: false,
      entities: [__dirname + '/../**/*.entity.js'],
    }),
    JwtModule.register({
      global: true,
      secret: jwt_const,
      signOptions: { expiresIn: '8h' }
    }),
    UserModule,
    TriagemModule


  ],

})
export class AppModule {}
