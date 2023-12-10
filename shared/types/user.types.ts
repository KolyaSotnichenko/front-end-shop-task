export interface IUser {
  _id: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isActive: boolean;

  address: string;
  organization: string;
  currency: string;

  subscription: [];

  products: [];

  createdAt: string;
}

export interface IUpdateUser {
  email?: string;
  password?: string;
  isAdmin?: string | boolean;
  isActive?: boolean | string;
  currency?: string;
  address?: string;
  organization?: string;
}
