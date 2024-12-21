import React from "react";
import ReactDOM from "react-dom/client";

// (CSS)
import "./main.css";

// (React router)
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// ( Pages )
import WalletPage from "./pages/Wallet";
import SuccessPage from "./pages/Success";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WalletPage />,
  },
  {
    path: "/success",
    element: <SuccessPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
