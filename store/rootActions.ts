import * as userActions from "./user/user.actions";
import * as cartActions from "./cart.slice";
import * as invoiceActions from "./invoice.slice";

export const allActions = {
  ...userActions,
  ...cartActions,
  ...invoiceActions,
};
