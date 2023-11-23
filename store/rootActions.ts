import * as userActions from "./user/user.actions";
import * as cartActions from "./cart.slice";

export const allActions = {
  ...userActions,
  ...cartActions,
};
