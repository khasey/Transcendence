import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { TwoFactorAuthController } from './2fa.controller';
import { TwoFactorAuthService } from './2fa.service';

@Module({
  imports: [
    UserModule,  // Ajoutez cette ligne
  ],
  controllers: [TwoFactorAuthController],
  providers: [TwoFactorAuthService],
})
export class TwoFactorAuthModule {}

