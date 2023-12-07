import { IProduct } from "./product.types";
import { ISubscription } from "./subscription.types";
import { IUser } from "./user.types";

export interface IInvoice {
  _id: string;
  invoiceNumber: string;
  user: IUser;
  products: IProduct[];
  subscriptions: ISubscription[];
  total: string;
  createdAt: string;
  counts: Object[];
  currency: string;
}

export interface ICreateInvoice {
  invoiceNumber: string;
  user: string;
  products: string[];
  subscriptions: string[];
  total: string;
  counts: Object[];
  currency: string;
}
