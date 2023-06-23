import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FortyTwoStrategy } from './strategy/42.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaClient } from '@prisma/client'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: '42' }),
  ],
  providers: [FortyTwoStrategy, AuthService, PrismaClient],
  exports: [PassportModule],
  controllers: [AuthController]
})
export class AuthModule {}