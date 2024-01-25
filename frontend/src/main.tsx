import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
 createBrowserRouter,
 createRoutesFromElements,
 Route,
 RouterProvider,
} from "react-router-dom";
import "./assets/styles/index.css";
import "./assets/styles/bootstrap.custom.css";
import { HomeScreen } from "./screens/HomeScreen.tsx";
import { ProductScreen } from "./screens/ProductScreen.tsx";
const router = createBrowserRouter(
 createRoutesFromElements(
  <Route path="/" element={<App />}>
   <Route index={true} path="/" element={<HomeScreen />}></Route>
   <Route path="/product/:id" element={<ProductScreen />} />
  </Route>
 )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
 <React.StrictMode>
  <RouterProvider router={router} />
 </React.StrictMode>
);
