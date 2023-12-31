import { useDebounce } from "@/hooks/useDebounde";
import { toastError } from "@/lib/toast-error";
import { InvoiceService } from "@/services/invoice.service";
import { ICreateInvoice, IInvoice } from "@/shared/types/invoice.type";
import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";

interface IInvoiceID {
  invoiceId?: string;
}

export const useInvoices = ({ invoiceId }: IInvoiceID) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const queryData = useQuery(
    ["invoices list", debouncedSearch],
    () => InvoiceService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map((invoice: IInvoice) => ({
          _id: invoice._id,
          items: [
            {
              invoiceId: invoice._id,
              invoiceNumber: invoice.invoiceNumber,
              invoiceUser: invoice.user?._id,
              invoiceCreatedAt: invoice.createdAt,
              invoiceProducts: [
                ...invoice.products.map((product) => {
                  return { title: product.title };
                }),
              ],
              invoiceSubscriptions: [
                ...invoice.subscriptions.map((subscription) => {
                  return {
                    title: subscription.title,
                  };
                }),
              ],
              invoiceTotal: invoice.total,
            },
          ],
        })),

      onError: (error) => {
        toastError(error, "Invoice list");
      },
    }
  );

  const { mutateAsync: createInvoiceAsync } = useMutation(
    "create invoice",
    (data: ICreateInvoice) => InvoiceService.createInvoice(data),
    {
      onError: (error) => {
        toastError(error, "Invoice list");
      },

      onSuccess: () => {
        toastr.success("Create invoice", "create was successful");
        queryData.refetch();
      },
    }
  );

  const invoiceData = useQuery("invoice data", () =>
    InvoiceService.getById(invoiceId!)
  );

  return useMemo(
    () => ({
      handleSearch,
      ...queryData,
      searchTerm,
      createInvoiceAsync,
      invoiceData,
    }),
    [queryData, searchTerm, createInvoiceAsync, invoiceData]
  );
};
