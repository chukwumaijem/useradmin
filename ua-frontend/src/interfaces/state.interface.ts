import { IUser } from './user.interface';

export interface IState {
  isLoggedIn: boolean;
  isLookingForUser: boolean;
  data?: IUser;
  usersList?: IUser[];
}
