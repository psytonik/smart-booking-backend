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
    const newUser = new this.usersModel(userDto);
    return newUser.save();
  }

  async getUser(): Promise<any> {
    return this.usersModel.find();
  }
}
