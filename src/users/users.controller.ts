import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { testConfig } from '../config/jwt.config';

@Controller('users')
export class UsersController {
  constructor(private readonly configService: ConfigService) {}
  @Get('/')
  async getUsers() {
    return testConfig(this.configService);
  }
}
