// src/features/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  items: {
    id: string;
    title: string;
    price: string;
  }[];
}

const initialState: IInitialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export const { reducer } = cartSlice;
