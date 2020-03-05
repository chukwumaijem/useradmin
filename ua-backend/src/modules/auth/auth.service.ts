import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(email: string, password: string): string {
    console.info('====email====', email);
    console.info('====password====', password);
    return 'jwt';
  }
}
