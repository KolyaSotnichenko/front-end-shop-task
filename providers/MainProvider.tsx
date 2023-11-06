"use client";
import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ReduxToast from "./ReduxToast";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import AuthProvider from "./AuthProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const MainProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ReduxToast />
          {children}
        </QueryClientProvider>
      </AuthProvider>
    </Provider>
  );
};

export default MainProvider;
