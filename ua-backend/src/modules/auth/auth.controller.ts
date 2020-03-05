import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ILogin, ISignup } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  login(@Body() body: ILogin): string {
    const { email, password } = body;

    return this.authService.login(email, password);
  }

  @Post('signup')
  signup(@Body() body: ISignup): string {
    return this.authService.signup({ ...body });
  }
}
