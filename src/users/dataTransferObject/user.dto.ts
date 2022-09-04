import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  passwordHash: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNumber()
  role: 1 | 2 | 3;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  favoriteService: string[];
}
