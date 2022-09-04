import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = UsersModel & Document;

type UserRole = {
  client: 0;
  business: 1;
  admin: 2;
};
Schema({ timestamps: true });
export class UsersModel {
  @ApiProperty()
  @Prop({ unique: true, required: true, type: String })
  email: string;

  @ApiProperty()
  @Prop({ required: true, type: String })
  passwordHash: string;

  @ApiProperty()
  @Prop({ unique: true, type: String })
  username: string;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  role: UserRole;

  @ApiProperty()
  @Prop({ type: () => [String] })
  favoriteService?: string[];
}

export const UserSchema = SchemaFactory.createForClass(UsersModel);
