import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAuthResponse, IEmailPassword } from "./user.interface";
import { AuthService } from "@/services/auth/auth.service";
import { toastr } from "react-redux-toastr";
import { toastError } from "@/lib/toast-error";
import { errorCatch } from "@/api/api.helpers";
import { IUser } from "@/shared/types/user.types";
import { getStoreLocal } from "@/lib/local-storage";

export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
  "auth/register",
  async ({ email, password }, thunkApi) => {
    try {
      const response = await AuthService.register(email, password);
      toastr.success("Registration", "Completed successfully");
      const user: IUser = getStoreLocal("user");
      localStorage.setItem("currency", user.currency);
      return response.data;
    } catch (error) {
      toastError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
  "auth/login",
  async ({ email, password }, thunkApi) => {
    try {
      const response = await AuthService.login(email, password);

      const user: IUser = getStoreLocal("user");

      if (user && user.isActive) {
        toastr.success("Login", "Completed successfully");
      } else {
        toastError("Login", "Your account has banned!");
      }
      localStorage.setItem("currency", user.currency);
      return response.data;
    } catch (error) {
      toastError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

export const checkAuth = createAsyncThunk<IAuthResponse>(
  "auth/check-auth",
  async (_, thunkApi) => {
    try {
      const response = await AuthService.getNewTokens();
      return response.data;
    } catch (error) {
      if (errorCatch(error) === "jwt expired") {
        toastr.error(
          "Logout",
          "Your authorization is finished, pls sign in again"
        );
        thunkApi.dispatch(logout());
      }

      return thunkApi.rejectWithValue(error);
    }
  }
);
