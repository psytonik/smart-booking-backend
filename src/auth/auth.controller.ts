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
  @HttpCode(401)
  @ApiOperation({ summary: 'Sign In User' })
  @ApiResponse({ status: 200, description: 'User Successfully sign in' })
  @ApiResponse({ status: 401, description: 'Wrong Password or Email' })
  @Post('')
  async signIn(@Body() { loginEmail, passwordHash }: AuthDto) {
    const { email } = await this.authService.validateUser(
      loginEmail,
      passwordHash,
    );
    return this.authService.signInUser(email);
  }
}
