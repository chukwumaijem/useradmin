export interface ILogin {
  email: string;
  password; string;
}

export interface ISignup {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface IUser {
  readonly username: string;
  readonly email: string;
  readonly isAdmin: boolean;
}
