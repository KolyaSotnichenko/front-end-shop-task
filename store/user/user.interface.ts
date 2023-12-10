import { IUser } from "@/shared/types/user.types";

export interface IUserState {
  _id: string;
  email: string;
  isAdmin: boolean;
  isActive: boolean | string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IInitialState {
  user: IUserState | null;
  isLoading: boolean;
}

export interface IEmailPassword {
  email: string;
  password: string;
}

export interface IAuthResponse extends ITokens {
  user: IUser;
}
