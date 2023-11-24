// src/features/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  invoiceNumber: string;
  invoiceUser: string;
  invoiceProducts: string[];
  invoiceSubscriptions: string[];
}

const initialState: IInitialState = {
  invoiceNumber: "",
  invoiceUser: "",
  invoiceProducts: [],
  invoiceSubscriptions: [],
};

const invoiceSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addInvoice: (state, action) => {
      state.invoiceNumber = action.payload.invoiceItem;
      state.invoiceUser = action.payload.invoiceUser;
      state.invoiceProducts = action.payload.invoiceProducts;
      state.invoiceSubscriptions = action.payload.invoiceSubscriptions;
    },
    removeInvoice: (state, action) => {
      state.invoiceNumber = "";
      state.invoiceUser = "";
      state.invoiceProducts = [];
      state.invoiceSubscriptions = [];
    },
  },
});

export const { addInvoice, removeInvoice } = invoiceSlice.actions;
export const { reducer } = invoiceSlice;
