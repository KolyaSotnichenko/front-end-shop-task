import axios from "@/api/interceptors";
import { getProductsUrl } from "@/config/api.config";
import {
  ICreateProduct,
  IProduct,
  IUpdateProduct,
} from "@/shared/types/product.types";

export const ProductService = {
  async createProduct(data: ICreateProduct) {
    return axios.post<string>(getProductsUrl(`/create`), data);
  },

  async getAll(searchTerm?: string) {
    return axios.get<IProduct[]>(getProductsUrl(``), {
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    });
  },

  async getById(_id: string) {
    return axios.get<IProduct>(getProductsUrl(`/${_id}`));
  },

  async updateProduct(_id: string, data: IUpdateProduct) {
    return axios.put<string>(getProductsUrl(`/${_id}`), data);
  },

  // async updateProfile(data: IProfileInput){
  //     return axios.put<string>(getUsersUrl(`/profile`), data)
  // },

  async deleteProduct(_id: string) {
    return axios.delete<string>(getProductsUrl(`/${_id}`));
  },
};
