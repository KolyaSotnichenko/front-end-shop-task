import { useTypedSelector } from "./useTypedSelector";

export const useInvoiceData = () => useTypedSelector((state) => state.invoice);
