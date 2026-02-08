import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "./Root.jsx";
import Home from "@/pages/Home.jsx";
import BlogsHome from "@/pages/BlogsHome.jsx";
import BlogDetail from "@/pages/BlogDetail.jsx";
import Games from "@/pages/Games.jsx";
import GameDetail from "@/pages/GameDetail.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "/blogs", element: <BlogsHome /> },
      { path: "/games", element: <Games /> },
      { path: "/blogs/:id", element: <BlogDetail /> },
      { path: "/games/:id", element: <GameDetail /> },
    ],
  },
]);
export default router;
