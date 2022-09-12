import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty()
  @IsString()
  loginEmail: string;

  @ApiProperty()
  @IsString()
  passwordHash: string;
}
