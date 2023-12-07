export interface IProduct {
  _id: string;
  title: string;
  image: string;
  description: string;
  price: {
    usd: number;
    eur: number;
  };

  createdAt: string;
}

export interface ICreateProduct {
  title: string;
  description: string;
  image: string;
  price: {
    usd: number;
    eur: number;
  };
}

export interface IUpdateProduct {
  title: string;
  description: string;
  image: string;
  price: {
    usd: number;
    eur: number;
  };
}
