import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthUser } from './auth.model';
import { User, UserDocument } from '../users/users.model';
import { Model } from 'mongoose';
import { EMAIL_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthUser.name) private readonly authUserModel: AuthUser,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}
  async findUser(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ email: string }> {
    const user = await this.findUser(email);

    if (!user) {
      throw new UnauthorizedException(EMAIL_NOT_FOUND_ERROR);
    }
    const correctPassword: boolean = await compare(password, user.passwordHash);
    if (!correctPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }
    return { email: user.email };
  }

  async signInUser(email: string) {
    const payload = { email };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
