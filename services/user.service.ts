// import { IProfileInput } from "@/components/screens/profile/profile.interface"
import { getUsersUrl } from "@/config/api.config";
import { IUpdateUser, IUser } from "@/shared/types/user.types";
import axios from "@/api/interceptors";

export const UserService = {
  async getAll(searchTerm?: string) {
    return axios.get<IUser[]>(getUsersUrl(``), {
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    });
  },

  async getProfile() {
    return axios.get<IUser>(getUsersUrl(`/profile`));
  },

  async getById(_id: string) {
    return axios.get<IUser>(getUsersUrl(`/${_id}`));
  },

  async updateUser(_id: string, data: IUpdateUser) {
    return axios.put<string>(getUsersUrl(`/${_id}`), data);
  },

  async addProduct(data: string[]) {
    return axios.put(getUsersUrl("/profile/add-products"), data);
  },

  async updateProfile(data: {
    email?: string;
    password?: string;
    address?: string;
    organization?: string;
    currency?: string;
  }) {
    return axios.put<string>(getUsersUrl(`/profile`), data);
  },

  async deleteUser(_id: string) {
    return axios.delete<string>(getUsersUrl(`/${_id}`));
  },
};
