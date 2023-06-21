// user.entity.ts

// Entity (user.entity.ts) : C'est une représentation 
// de votre table de base de données dans le code. 
// Elle définit la structure de votre table de base de données,
//  notamment les colonnes et leurs types.

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  username: string;

  @Column()
  authentification: boolean;

  @Column('text', { nullable: true })
  imageUrl: string;

  // Ajoutez d'autres colonnes au besoin
}
