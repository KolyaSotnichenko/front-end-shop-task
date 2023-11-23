export const generateInvoiceId = () => {
  let invoiceId = "";

  for (let i = 0; i < 16; i++) {
    invoiceId += Math.floor(Math.random() * 10).toString();
  }

  return invoiceId;
};
