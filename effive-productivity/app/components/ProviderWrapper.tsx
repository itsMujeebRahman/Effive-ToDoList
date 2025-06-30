"use client";
import React, { ReactNode } from "react";
import store from "../store/store";
import { Provider } from "react-redux";

interface props {
  children: ReactNode;
}

const ProviderWrapper = ({ children }: props) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderWrapper;
