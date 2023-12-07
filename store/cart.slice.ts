// src/features/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  items: {
    id: string;
    title: string;
    count: number;
    price: number;
    isSubscription: boolean;
    period?: string;
    currency: string;
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
    increaseCountItem: (state, action) => {
      state.items.filter(
        (item) => item.id === action.payload.id && item.count++
      );
    },
    decreaseCountItem: (state, action) => {
      state.items.filter(
        (item) => item.id === action.payload.id && item.count--
      );
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  increaseCountItem,
  decreaseCountItem,
  removeItem,
  clearCart,
} = cartSlice.actions;
export const { reducer } = cartSlice;
