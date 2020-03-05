import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import { ISignup, IUser, ILogin } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) { }

  private generateToken(userData: IUser): string {
    return sign(userData, process.env.SECRET, { expiresIn: '1d' });
  }

  private verifyPassword(sentPassword, savedPassword): boolean {
    return bcrypt.compareSync(sentPassword, savedPassword);
  }

  async login(body: ILogin): Promise<IUser> {
    const { email, password } = body;

    try {
      let user = await this.userModel.findOne({ email })
      if (user && this.verifyPassword(password, user.password)) {
        user = user.toObject();
        delete user.password;

        user.token = this.generateToken({ ...user });
        return user;
      }
      throw new NotFoundException();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async signup(body: ISignup): Promise<IUser> {
    try {
      const newUser = new this.userModel(body);
      let user = await newUser.save();
      user = user.toObject();
      delete user.password;

      user.token = this.generateToken({ ...user });
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
