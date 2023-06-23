import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
export declare class TwoFactorAuthService {
    private userService;
    constructor(userService: UserService);
    generateSecret(): string;
    generateTwoFactorQRCodeUrl(user: User, secret: string): string;
    verifyTwoFactorToken(token: string, secret: string): boolean;
    saveTwoFactorAuthSecret(userId: any, secret: string): Promise<void>;
    removeTwoFactorAuthSecret(userId: any): Promise<void>;
}
