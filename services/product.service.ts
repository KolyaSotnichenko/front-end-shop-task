import axios from "@/api/interceptors";
import { getProductsUrl } from "@/config/api.config";
import { IProduct } from "@/shared/types/product.types";

export const ProductService = {
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

  // async updateUser(_id: string, data: IProfileInput) {
  //     return axios.put<string>(getUsersUrl(`/${_id}`), data)
  // },

  // async updateProfile(data: IProfileInput){
  //     return axios.put<string>(getUsersUrl(`/profile`), data)
  // },

  async deleteProduct(_id: string) {
    return axios.delete<string>(getProductsUrl(`/${_id}`));
  },
};
