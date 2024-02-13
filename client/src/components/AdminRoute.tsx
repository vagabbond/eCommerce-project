import { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";
export const AdminRoute: FC = () => {
 const { userInfo } = useAppSelector((state) => state.auth);
 return userInfo && userInfo.isAdmin ? (
  <Outlet />
 ) : (
  <Navigate to="/login" replace />
 );
};
