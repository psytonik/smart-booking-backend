import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from './users.model';
import { Model } from 'mongoose';
import { UserDto } from './dataTransferObject/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<UserDocument>,
  ) {}

  async createUser(userDto: UserDto): Promise<User> {
    await this.checkExistingEmail(userDto.email);
    const newUser = new this.usersModel(userDto);
    return await newUser.save();
  }

  async getUser(): Promise<any> {
    return this.usersModel.find();
  }

  async checkExistingEmail(email: string) {
    const user = this.usersModel.findOne({ email });
    if (user) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return;
  }
}
