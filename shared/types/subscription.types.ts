export interface ISubscription {
  _id: string;
  title: string;
  image: string;
  description: string;
  price: number;
  period: string;

  createdAt: string;
}

export interface ICreateSubscription {
  title: string;
  image: string;
  description: string;
  price: number;
  period: string;
}

export interface IUpdateSubscription {
  title: string;
  image: string;
  description: string;
  price: number;
  period: string;
}
