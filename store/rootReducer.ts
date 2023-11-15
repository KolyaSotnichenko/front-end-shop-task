import { reducer as toastrReducer } from "react-redux-toastr";
import { reducer as userReducer } from "./user/user.slice";
import { reducer as cartReducer } from "./cart.slice";

export const reducers = {
  toastr: toastrReducer,
  user: userReducer,
  cart: cartReducer,
};
