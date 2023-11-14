export interface IProduct {
  _id: string;
  title: string;
  image: string;
  description: string;
  price: number;

  createdAt: string;
}

export interface ICreateProduct {
  title: string;
  description: string;
  image: string;
  price: string;
}
