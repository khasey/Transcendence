import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-42';

@Injectable()

export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor() {
	super({
	  clientID: 'u-s4t2ud-4b59d2f3b0782fd287b010ca8d60afc6c2c83a39f298c46d0165eec2e5f86fa8',
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