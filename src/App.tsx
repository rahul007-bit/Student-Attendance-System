import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { createBrowserRouter, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Report from "./pages/Report";
import Attendance from "./pages/Attendance";

const routes = createBrowserRouter([
  {
    element: <Header />,
    children: [
      {
        path: "/",
        element: <Report />,
      },
      {
        path: "/attendance",
        element: <Attendance />,
      },
    ],
  },
]);

export default routes;
