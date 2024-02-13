import { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";
export const PrivateRoute: FC = () => {
 const { userInfo } = useAppSelector((state) => state.auth);
 return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};
