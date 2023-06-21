import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';

@Module({
  imports: [AuthModule, UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: () => ({
        type: 'postgres',
        host: 'containers-us-west-53.railway.app',
        port: 5959,
        username: 'postgres',
        password: 'oJzlKrGNlIa8N5stYL2G',
        database: 'railway',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    // UserModule,
],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}