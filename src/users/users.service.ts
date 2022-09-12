import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from './users.model';
import { Model } from 'mongoose';
import { UserDto } from './dataTransferObject/user.dto';
import slugify from 'slugify';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<UserDocument>,
  ) {}

  async createUser(userDto: UserDto): Promise<User> {
    const salt = await genSalt(10);
    const newUser = new User();
    Object.assign(newUser, userDto);
    if (!newUser.favoriteService) {
      newUser.favoriteService = [];
    }

    newUser.slug = UsersService.getSlug(newUser.username);
    newUser.passwordHash = await hash(newUser.passwordHash, salt);

    const user = new this.usersModel(newUser);

    return await user.save();
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersModel.find({}).catch((err) => {
      throw new HttpException(err.message, HttpStatus.UNPROCESSABLE_ENTITY);
    });
  }

  async getUserByName(slug: string): Promise<User> {
    return this.usersModel.findOne({ slug }).exec();
  }

  private static getSlug(username: string): string {
    return slugify(username, { lower: true, replacement: '_' });
  }
}
