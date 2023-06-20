import { Controller, Get, UseGuards, Req, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @UseGuards(AuthGuard('42'))
  async fortyTwoAuth(@Req() req) {
    // Récupération des données de l'API 42
    const apiData = req.user;

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

    // Continuer avec le reste de la logique de l'authentification
  }

  @Get('login/callback')
  @UseGuards(AuthGuard('42'))
  @Redirect('http://localhost:3000/login')
  fortyTwoAuthRedirect(@Req() req) {
    return this.authService.fortyTwoLogin(req);
  }
}
