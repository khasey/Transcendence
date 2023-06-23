import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { parse } from 'path';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaClient) {}
  fortyTwoLogin(req) {
    if (!req.user) {
      return 'No user from 42';
    }
    return {
      message: 'User information from 42',
      user: req.user,
    };
  }

  async enregistrerUtilisateur(data) {
    try {
      const { id, username, imageUrl } = data;
      console.log('data =', data);

      const utilisateur = await this.prisma.user.create({
        data: {
          id: parseInt(id),
          username,
          imageUrl,
          authentification: true,
          twoFactorEnabled: false,
        },
        // console.log('utilisateur =', data);
      });
      console.log('utilisateur =', utilisateur);
      return utilisateur;
    } catch (error) {
      throw new Error(`Erreur lors de l'enregistrement de l'utilisateur : ${error.message}`);
    }
  }
}