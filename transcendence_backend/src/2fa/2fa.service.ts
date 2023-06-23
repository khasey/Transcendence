import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity'; // Importez votre modèle d'utilisateur approprié

@Injectable()
export class TwoFactorAuthService {
  constructor(private userService: UserService) {}

  generateSecret(): string {
    const secret = speakeasy.generateSecret({ length: 20 });
    return secret.base32;
  }

  generateTwoFactorQRCodeUrl(user: User, secret: string): string {
    const url = speakeasy.otpauthURL({
      secret: secret,
      label: user.username,
      issuer: 'Pong',
    });
    return url;
  }

  verifyTwoFactorToken(token: string, secret: string): boolean {
    const isValid = speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token,
      window: 1, // Validation window of 1 step backward and 1 step forward
    });
    return isValid;
  }

  async saveTwoFactorAuthSecret(userId: any, secret: string): Promise<void> {
    const user = await this.userService.findUserById(userId);
    user.twoFactorAuthSecret = secret;
    await this.userService.save(user); // Utilisez la méthode appropriée pour enregistrer l'utilisateur dans la base de données
  }

  async removeTwoFactorAuthSecret(userId: any): Promise<void> {
    const user = await this.userService.findUserById(userId);
    user.twoFactorAuthSecret = undefined;
    await this.userService.save(user); // Utilisez la méthode appropriée pour enregistrer l'utilisateur dans la base de données
  }
}
