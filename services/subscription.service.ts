import axios from "@/api/interceptors";
import { getSubscriptionsUrl } from "@/config/api.config";
import { ISubscription } from "@/shared/types/subscription.types";

export const SubscriptionService = {
  async getAll(searchTerm?: string) {
    return axios.get<ISubscription[]>(getSubscriptionsUrl(``), {
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    });
  },

  async getById(_id: string) {
    return axios.get<ISubscription>(getSubscriptionsUrl(`/${_id}`));
  },

  // async updateUser(_id: string, data: IProfileInput) {
  //     return axios.put<string>(getUsersUrl(`/${_id}`), data)
  // },

  // async updateProfile(data: IProfileInput){
  //     return axios.put<string>(getUsersUrl(`/profile`), data)
  // },

  async deleteProduct(_id: string) {
    return axios.delete<string>(getSubscriptionsUrl(`/${_id}`));
  },
};
