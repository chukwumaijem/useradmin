import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ILogin, ISignup, IUser } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  login(@Body() body: ILogin): Promise<IUser> {
    return this.authService.login(body);
  }

  @Post('signup')
  signup(@Body() body: ISignup): Promise<IUser> {
    return this.authService.signup({ ...body });
  }
}
