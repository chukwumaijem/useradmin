import { Controller, Get, Put, Delete, Body, Query, Param } from '@nestjs/common';

import { UserService } from './user.service';
import { IUser, IPageQuery, IGetUsers } from '../../interfaces';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  async getUsers(@Query() query: IPageQuery): Promise<IGetUsers> {
    return this.userService.getUsers(query);
  }

  @Delete('id')
  async deleteUser(@Param('id') userId): Promise<boolean> {
    return this.userService.deleteUser(userId);
  }

  @Put('id')
  async updateUser(@Body() user: IUser): Promise<boolean> {
    return this.userService.updateUser(user);
  }
}
