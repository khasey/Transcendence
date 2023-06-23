import { TwoFactorAuthService } from './2fa.service';
import { UserService } from '../user/user.service';
export declare class TwoFactorAuthController {
    private twoFactorAuthService;
    private userService;
    constructor(twoFactorAuthService: TwoFactorAuthService, userService: UserService);
    enableTwoFactorAuth(request: any): Promise<string>;
    disableTwoFactorAuth(request: any): Promise<void>;
    verifyTwoFactorToken(request: any, token: string): Promise<{
        isValid: boolean;
    }>;
}
