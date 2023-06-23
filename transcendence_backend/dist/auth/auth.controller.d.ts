import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    fortyTwoAuth(): void;
    fortyTwoAuthRedirect(req: any, res: Response): Promise<void>;
    getUser(req: any, res: Response): Promise<void>;
}
