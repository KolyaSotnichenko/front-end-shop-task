export interface IUser {
  _id: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isActive: boolean;

  subscription: [];

  products: [];

  createdAt: string;
}

export interface IUpdateUser {
  email?: string;
  isAdmin: string | boolean;
}
