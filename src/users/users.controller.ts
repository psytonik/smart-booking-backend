import { Controller, Get, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @HttpCode(200)
  @Get('/')
  async getUsers(): Promise<any> {
    return await this.userService.getUser();
  }
}
