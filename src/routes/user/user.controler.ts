import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post()
  async createUser(@Body() User: User): Promise<User> {
    return this.UserService.createUser(User);
  }

}
