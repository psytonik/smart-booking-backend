import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async getUser() {
    return { status: 'hello from user service' };
  }
}
