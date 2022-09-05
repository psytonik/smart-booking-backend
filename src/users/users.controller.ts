import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dataTransferObject/user.dto';
import { User } from './users.model';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  @Post()
  async createUser(@Body() userDto: UserDto): Promise<User> {
    return await this.userService.createUser(userDto);
  }

  @HttpCode(200)
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUser();
  }
}
