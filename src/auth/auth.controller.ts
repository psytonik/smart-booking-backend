import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @ApiOperation({ summary: 'Sign In User' })
  @ApiResponse({ status: 200, description: 'User Successfully sign in' })
  @Post('')
  async signIn(@Body() { loginEmail, passwordHash }: AuthDto) {
    const { email } = await this.authService.validateUser(
      loginEmail,
      passwordHash,
    );
    return this.authService.signInUser(email);
  }
}
