import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
 createBrowserRouter,
 createRoutesFromElements,
 Route,
 RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import "./assets/styles/index.css";
import "./assets/styles/bootstrap.custom.css";

import store from "./redux/store.ts";
import { PrivateRoute } from "./components/PrivateRoute.tsx";
import { AdminRoute } from "./components/AdminRoute.tsx";

import { RegisterScreen } from "./screens/RegisterScreen.tsx";
import { HomeScreen } from "./screens/HomeScreen.tsx";
import { ProductScreen } from "./screens/ProductScreen.tsx";
import { CartScreen } from "./screens/CartScreen.tsx";
import { LoginScreen } from "./screens/LoginScreen.tsx";
import { ShippingScreen } from "./screens/ShippingScreen.tsx";
import { PaymentScreen } from "./screens/PaymentScreen.tsx";
import { PlaceOrderScreen } from "./screens/PlaceOrderScreen.tsx";
import { OrderScreen } from "./screens/OrderScreen.tsx";
import { ProfileScreen } from "./screens/ProfileScreen.tsx";
import { OrderListScreen } from "./screens/admin/OrderListScreen.tsx";
import { ProductListScreen } from "./screens/admin/ProductListScreen.tsx";
import { ProductEditScreen } from "./screens/admin/ProductEditScreen.tsx";
import { UserListScreen } from "./screens/admin/UserListScreen.tsx";
import { UserEditScreen } from "./screens/admin/UserEditScreen.tsx";
const router = createBrowserRouter(
 createRoutesFromElements(
  <Route path="/" element={<App />}>
   <Route index={true} path="/" element={<HomeScreen />} />
   <Route path="/search/:keyword" element={<HomeScreen />} />
   <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
   <Route path="/page/:pageNumber" element={<HomeScreen />} />
   <Route path="/product/:id" element={<ProductScreen />} />
   <Route path="/cart" element={<CartScreen />} />
   <Route path="/login" element={<LoginScreen />} />
   <Route path="/register" element={<RegisterScreen />} />
   <Route path="" element={<PrivateRoute />}>
    <Route path="/shipping" element={<ShippingScreen />} />
    <Route path="/payment" element={<PaymentScreen />} />
    <Route path="/placeorder" element={<PlaceOrderScreen />} />
    <Route path="/order/:id" element={<OrderScreen />} />
    <Route path="/profile" element={<ProfileScreen />} />
   </Route>
   <Route path="" element={<AdminRoute />}>
    <Route path="/admin/orderlist" element={<OrderListScreen />} />
    <Route path="/admin/orderlist/:pageNumber" element={<OrderListScreen />} />
    <Route path="/admin/productlist" element={<ProductListScreen />} />
    <Route
     path="/admin/productlist/:pageNumber"
     element={<ProductListScreen />}
    />
    <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
    <Route path="/admin/userlist" element={<UserListScreen />} />
    <Route path="/admin/userlist/:pageNumber" element={<UserListScreen />} />
    <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
   </Route>
  </Route>
 )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
 <React.StrictMode>
  <HelmetProvider>
   <Provider store={store}>
    <PayPalScriptProvider deferLoading={false} options={{ clientId: "test" }}>
     <RouterProvider router={router} />
    </PayPalScriptProvider>
   </Provider>
  </HelmetProvider>
 </React.StrictMode>
);
