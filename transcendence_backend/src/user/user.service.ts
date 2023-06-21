// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity'; // Assurez-vous que le chemin est correct

// Service (user.service.ts) : Il s'occupe de la logique métier. 
// C'est ici que vous allez chercher des informations dans votre 
// base de données ou effectuer d'autres actions liées à l'utilisateur. 
// Le service est utilisé par le contrôleur.

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUserById(userId: any): Promise<User | null> {
    return await this.userRepository.findOne(userId);
  }
}
