import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UsersModel } from './users.model';
import { UserDto } from './dataTransferObject/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UsersModel.name)
    private readonly usersModel: Model<UserDocument>,
  ) {}

  async getUser(): Promise<any> {
    console.log(this.usersModel.find());
    return this.usersModel.find();
  }

  async createUser(userDto: UserDto): Promise<UsersModel> {
    return await this.usersModel.create(userDto);
  }
}
