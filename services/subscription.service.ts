import axios from "@/api/interceptors";
import { getSubscriptionsUrl } from "@/config/api.config";
import {
  ICreateSubscription,
  ISubscription,
  IUpdateSubscription,
} from "@/shared/types/subscription.types";

export const SubscriptionService = {
  async createSubscription(data: ICreateSubscription) {
    return axios.post<string>(getSubscriptionsUrl(`/create`), data);
  },

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

  async updateSubscription(_id: string, data: IUpdateSubscription) {
    return axios.put<string>(getSubscriptionsUrl(`/${_id}`), data);
  },

  // async updateProfile(data: IProfileInput){
  //     return axios.put<string>(getUsersUrl(`/profile`), data)
  // },

  async deleteProduct(_id: string) {
    return axios.delete<string>(getSubscriptionsUrl(`/${_id}`));
  },
};
