import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "./Root.jsx";
import Home from "@/pages/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
    ],
  },
]);
export default router;