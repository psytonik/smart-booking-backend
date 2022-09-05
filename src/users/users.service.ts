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
    if (!userDto) {
      throw new HttpException(
        'Data Not Provided, Please fill all fields',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.checkExistingEmail(userDto.email);
    const newUser = new this.usersModel(userDto);
    return await newUser.save();
  }

  async getUser(): Promise<any> {
    return this.usersModel.find();
  }

  async checkExistingEmail(email: string) {
    const user: User = await this.usersModel.findOne({ email }).exec();

    if (user.email === email) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      return;
    }
  }
}
