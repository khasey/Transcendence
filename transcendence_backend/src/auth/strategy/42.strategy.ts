import { PassportStrategy } from '@nestjs/passport';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-42';

@Injectable()

export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor() {
	super({
	  clientID: 'u-s4t2ud-e7daa1cd3988c5b32348c2167317904d6f19afe7e320406b93f59ba17da0785a',
	  clientSecret: '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',
	  callbackURL: 'http://localhost:4000/login/callback',
	  scope: 'public',
	});
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<any> {
	const { id, username, emails } = profile;

	// Récupération de la réponse brute
	const rawResponse = JSON.parse(profile._raw);

	// Extraction de l'URL de l'image de profil
	const imageUrl = rawResponse.image?.link || null;

	const user = {
	  imageUrl,
	  accessToken,
	  refreshToken,
	  id,
	  username,
	  emails,
	};

	console.log('user =', user);

	done(null, user);
  }
}
