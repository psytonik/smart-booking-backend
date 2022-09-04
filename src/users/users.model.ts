import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

Schema({ timestamps: true });
export class UsersModel {
  @ApiProperty()
  @Prop({ unique: true, required: true, type: String })
  email: string;

  @ApiProperty()
  @Prop({ required: true, type: String })
  password: string;

  @ApiProperty()
  @Prop({ unique: true, type: String })
  username: string;

  @ApiProperty()
  @Prop({ type: Number })
  role: number;

  @ApiProperty()
  @Prop({ type: () => [String] })
  favoriteService: string[];
}

export const UserSchema = SchemaFactory.createForClass(UsersModel);
