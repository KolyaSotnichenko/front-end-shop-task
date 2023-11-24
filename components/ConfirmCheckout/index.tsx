"use client";

import Invoice from "../Invoice";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { FC } from "react";

interface IConfirmCheckout {
  handleCheckout: () => void;
  isOpen: boolean;
  handleOpen: () => void;
}

const ConfirmCheckout: FC<IConfirmCheckout> = ({
  handleCheckout,
  isOpen,
  handleOpen,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className="h-[50%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Confirm checkout!</DialogTitle>
        </DialogHeader>
        <Invoice />
        <DialogFooter>
          <div className="flex items-center justify-center">
            <Button variant="secondary" onClick={handleCheckout}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmCheckout;
