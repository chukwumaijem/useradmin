import { IUser } from './user.interface';

export interface IGetUsers {
  success: boolean;
  total: number;
  per_page: number;
  page: number;
  data: IUser[],
}
