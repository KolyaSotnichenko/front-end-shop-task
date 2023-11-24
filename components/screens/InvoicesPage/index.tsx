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
import { IProduct } from "@/shared/types/product.types";

const InvoicesPageComponent = () => {
  const { data } = useInvoices();

  return (
    <div className="flex justify-center items-center p-20">
      {data && data.length !== 0 ? (
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
            {data.map((item) => (
              <>
                {item.items.map((invoice: any) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
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
                            ].map((product: IProduct) => (
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
