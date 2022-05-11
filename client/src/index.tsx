import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import TransactionsProvider from "./context/Transactions";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <TransactionsProvider>
      <App />
    </TransactionsProvider>
  </React.StrictMode>
);
