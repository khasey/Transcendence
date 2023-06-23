import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaClient,
    private jwtService: JwtService
  ) {}

  async generateJwt(user) {
    const { id, username } = user;
    const payload = { id, username };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async validateUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: parseInt(id) }});
    return user;
  }

  async enregistrerUtilisateur(data) {
    try {
      const { id, username, imageUrl } = data;

      const utilisateur = await this.prisma.user.upsert({
        where: { id: parseInt(id) },
        update: {
          username,
          imageUrl,
          authentification: true,
          twoFactorEnabled: false,
        },
        create: {
          id: parseInt(id),
          username,
          imageUrl,
          authentification: true,
          twoFactorEnabled: false,
        },
      });
      return utilisateur;
    } catch (error) {
      throw new Error(`Erreur lors de l'enregistrement de l'utilisateur : ${error.message}`);
    }
  }
}
