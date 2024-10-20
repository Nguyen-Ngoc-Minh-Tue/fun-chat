import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
import ChatRoom from "./components/Chatroom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <ChatRoom />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
