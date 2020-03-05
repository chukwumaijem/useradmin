import { Injectable } from '@nestjs/common';
import { ISignup } from './auth.interface';

@Injectable()
export class AuthService {
  login(email: string, password: string): string {
    console.info('====email====', email);
    console.info('====password====', password);
    return 'jwt';
  }

  signup(body: ISignup): string {
    const { email, password, username, isAdmin } = body;

    console.info('====username====', username);
    console.info('====email====', email);
    console.info('====password====', password);
    console.info('====isAdmin====', isAdmin);
    return 'jwt';
  }
}
