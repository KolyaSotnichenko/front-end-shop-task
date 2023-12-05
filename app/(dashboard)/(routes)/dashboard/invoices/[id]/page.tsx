import InvoiceDetail from "@/components/InvoiceDetail";

const InvoicePage = ({ params }: { params: { id: string } }) => {
  return <InvoiceDetail invoiceId={params.id} />;
};

export default InvoicePage;
