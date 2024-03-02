import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./store/store.ts";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </React.StrictMode>
);
