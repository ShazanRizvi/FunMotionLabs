import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import appRouter from "./Routes/index.jsx";

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
