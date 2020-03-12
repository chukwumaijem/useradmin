export interface IUser {
  readonly _id?: string;
  readonly username: string;
  readonly email: string;
  readonly isAdmin: boolean;
  readonly token?: string;
}
