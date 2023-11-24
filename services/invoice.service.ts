import axios from "@/api/interceptors";
import { getInvoicesUrl } from "@/config/api.config";
import { ICreateInvoice, IInvoice } from "@/shared/types/invoice.type";

export const InvoiceService = {
  async createInvoice(data: ICreateInvoice) {
    return axios.post<string>(getInvoicesUrl(`/create`), data);
  },

  async getAll(searchTerm?: string) {
    return axios.get<IInvoice[]>(getInvoicesUrl(``), {
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    });
  },

  async getById(_id: string) {
    return axios.get<IInvoice>(getInvoicesUrl(`/${_id}`));
  },
};
