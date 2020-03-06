import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUser, IPageQuery, IGetUsers } from '../../interfaces';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) { }

  private buildPagination(qs: IPageQuery): IPageQuery {
    const query: IPageQuery = { limit: 0, skip: 0 };
    let { per_page, page } = qs;
    if (!per_page) per_page = 1;

    if (per_page && !isNaN(per_page)) query.limit = Number(per_page);
    if (page && !isNaN(page) && Number(page) > 0)
      query.skip = Number(page) - 1, 10 * query.limit;

    return query;
  }

  private buildFilters(qs: IPageQuery) {
    const query = { isAdmin: false };
    const { isAdmin } = qs;

    if (isAdmin) query.isAdmin = isAdmin;
    return query;
  }

  private buildResponse(users: IUser[], total: number, limit: number, page: number) {
    return {
      success: true,
      total,
      per_page: limit,
      page,
      data: users,
    };
  }

  async getUsers(query: IPageQuery): Promise<IGetUsers> {
    const { limit, skip } = this.buildPagination(query);
    const filters = this.buildFilters(query);

    try {
      const count = await this.userModel.countDocuments(filters);
      const users = await this.userModel
        .find()
        .where(filters)
        .select('username email isAdmin')
        .skip(skip)
        .limit(limit);

      const page = skip / limit + 1 || 1;
      return this.buildResponse(users, count, limit, page);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteUser(userId: string): Promise<boolean> {
    try {
      const result = await this.userModel.deleteOne({ _id: userId })
      if (result.ok) {
        return true;
      }
      return false;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateUser(userData: IUser): Promise<boolean> {
    const { _id, email, username, isAdmin } = userData;
    try {
      await this.userModel.updateOne({ _id }, { email, username, isAdmin });
      return true;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
