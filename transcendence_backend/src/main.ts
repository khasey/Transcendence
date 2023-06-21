import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: cors.CorsOptions = {
    origin: '*', // Autorise toutes les origines (à ajuster selon vos besoins)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Autorise les méthodes HTTP spécifiées
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  app.use(cors(corsOptions));

  await app.listen(4000);
}
bootstrap();
