import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}
  
  @Get('/')
  getHello(): string {
    return 'Hello World!';
  }

  @Get('/user/:id')
  async getUser(@Param('id') userId: string): Promise<User> {
    const parsedUserId = parseInt(userId, 10);
    console.log(parsedUserId);
    const user = await this.userService.findUserById(parsedUserId);
    console.log(user);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}

