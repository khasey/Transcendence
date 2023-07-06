import { UserService } from './user/user.service';
import { User } from './user/user.entity';
export declare class AppController {
    private readonly userService;
    constructor(userService: UserService);
    getHello(): string;
    getUser(userId: string): Promise<User>;
}
