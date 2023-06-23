import { Controller, Post, Body, Request } from '@nestjs/common';
import { TwoFactorAuthService } from './2fa.service';
import { UserService } from '../user/user.service';

@Controller('2fa')
export class TwoFactorAuthController {
  constructor(
    private twoFactorAuthService: TwoFactorAuthService,
    private userService: UserService,
  ) {}

  @Post('enable')
  async enableTwoFactorAuth(@Request() request: any): Promise<string> {
    const userId = request.user.id;
    const user = await this.userService.findUserById(userId);

    // Vérifier si l'utilisateur a déjà effectué une première authentification
    if (user.authentification) {
      const secret = this.twoFactorAuthService.generateSecret();
      const qrCodeUrl = this.twoFactorAuthService.generateTwoFactorQRCodeUrl(
        user,
        secret,
      );

      // Enregistrer le secret de la 2FA uniquement si le bouton est activé
      if (user.twoFactorEnabled) {
        await this.userService.enableTwoFactorAuth(userId);
        await this.twoFactorAuthService.saveTwoFactorAuthSecret(userId, secret);
      }

      return qrCodeUrl;
    }
  }

  @Post('disable')
  async disableTwoFactorAuth(@Request() request: any): Promise<void> {
    const userId = request.user.id;
    await this.userService.disableTwoFactorAuth(userId);
    await this.twoFactorAuthService.removeTwoFactorAuthSecret(userId);
  }

  @Post('verify')
  async verifyTwoFactorToken(
    @Request() request: any,
    @Body('token') token: string,
  ): Promise<{ isValid: boolean }> {
    const userId = request.user.id;
    const user = await this.userService.findUserById(userId);
    const secret = user.twoFactorAuthSecret;
    const isValid = this.twoFactorAuthService.verifyTwoFactorToken(
      token,
      secret,
    );
    return { isValid };
  }
}
