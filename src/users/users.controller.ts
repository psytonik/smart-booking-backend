import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dataTransferObject/user.dto';
import { User } from './users.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ALREADY_REGISTERED_ERROR } from './user.constants';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create New User' })
  @ApiResponse({ status: 201, description: 'User Successfully created' })
  @ApiResponse({ status: 400, description: 'User Already Registered' })
  @HttpCode(201)
  @HttpCode(400)
  @Post()
  async createUser(@Body() userDto: UserDto): Promise<User> {
    const oldUser = await this.userService.findUser(userDto.email);
    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }
    return await this.userService.createUser(userDto);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({ status: 200, description: 'Get all users Success' })
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Get User By slug or username' })
  @ApiResponse({ status: 200, description: 'Get user by slug Success' })
  @ApiResponse({ status: 404, description: 'User Not Found' })
  @Get('/:slug')
  async getUserBySlug(@Param('slug') slug: string): Promise<User> {
    console.log(slug);
    return await this.userService.getUserBySlug(slug);
  }
}
