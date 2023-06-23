import { PrismaClient } from '@prisma/client';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaClient);
    fortyTwoLogin(req: any): "No user from 42" | {
        message: string;
        user: any;
    };
    enregistrerUtilisateur(data: any): Promise<{
        id: number;
        username: string;
        authentification: boolean;
        imageUrl: string;
        twoFactorAuthSecret: string;
        twoFactorEnabled: boolean;
    } & {}>;
}
