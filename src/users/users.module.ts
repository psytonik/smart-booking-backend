import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UsersModel } from './users.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: UserSchema,
        collection: 'User',
        name: UsersModel.name,
      },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
