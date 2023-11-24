"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInvoices } from "./useInvoices";
import { convertMongoDate } from "@/lib/convertMongoDate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getStoreLocal } from "@/lib/local-storage";

const InvoicesPageComponent = () => {
  const { data } = useInvoices();
  const router = useRouter();

  const user = getStoreLocal("user");

  const filteredInvoices = data?.map((item) =>
    item.items.filter((invoice: any) => invoice.invoiceUser === user?._id)
  );

  return (
    <div className="flex justify-center items-center p-20">
      {filteredInvoices && filteredInvoices.length !== 0 ? (
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Created at</TableHead>
              {/* <TableHead className="text-right">Amount</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices?.map((item) => (
              <>
                {item.map((invoice: any) => (
                  <TableRow key={invoice.invoiceNumber}>
                    <TableCell
                      className="font-medium cursor-pointer"
                      onClick={() =>
                        router.push(`/invoice/${invoice.invoiceId}`)
                      }
                    >
                      {invoice.invoiceNumber}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="outline">
                            Show
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuRadioGroup value="">
                            {[
                              ...invoice.invoiceProducts,
                              ...invoice.invoiceSubscriptions,
                            ].map((product: { title: string }) => (
                              <DropdownMenuRadioItem value="">
                                {product.title}
                              </DropdownMenuRadioItem>
                            ))}
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell>${invoice.invoiceTotal}</TableCell>
                    <TableCell className="text-right">
                      {convertMongoDate(invoice.invoiceCreatedAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">${grandTotal}</TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      ) : (
        <p>Not found invoices</p>
      )}
    </div>
  );
};

export default InvoicesPageComponent;
