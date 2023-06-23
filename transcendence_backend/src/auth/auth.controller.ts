import { Controller, Get, UseGuards, Req, Res, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @UseGuards(AuthGuard('42'))
  // Pas de logique ici, juste une redirection vers la page de connexion de l'API 42
  fortyTwoAuth() {}

  @Get('login/callback')
  @UseGuards(AuthGuard('42'))
  async fortyTwoAuthRedirect(@Req() req, @Res() res: Response) {
    // Récupération des données de l'API 42
    const apiData = req.user;
    console.log('req.user =', req.user);

    // Enregistrement des données dans la base de données
    const utilisateurEnregistre = await this.authService.enregistrerUtilisateur(apiData);

    // Vérification si l'enregistrement a réussi
    if (utilisateurEnregistre) {
      console.log('Utilisateur enregistré avec succès :', utilisateurEnregistre);
      // Réalise les actions supplémentaires si nécessaire
    } else {
      console.error('Erreur lors de l\'enregistrement de l\'utilisateur');
      // Gère l'erreur d'enregistrement
    }

    // Redirige l'utilisateur vers votre page de connexion après avoir traité les informations de l'API 42
    res.redirect('http://localhost:3000/login');
  }
}
