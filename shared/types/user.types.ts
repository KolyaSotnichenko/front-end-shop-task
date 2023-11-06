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
