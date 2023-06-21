import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') userId: string): Promise<User> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
