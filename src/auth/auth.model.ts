import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class AuthUser {
  @Prop({ unique: true })
  email: string;

  @Prop()
  passwordHash: string;
}

export const AuthUserSchema = SchemaFactory.createForClass(AuthUser);
