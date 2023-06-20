import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

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

      const utilisateur = await this.prisma.user.create({
        data: {
          id,
          username,
          imageUrl,
          authentification: true,
        },
      });

      return utilisateur;
    } catch (error) {
      console.error('Erreur lors de lenregistrement de l utilisateur :', error);
      throw error;
    }
  }
}