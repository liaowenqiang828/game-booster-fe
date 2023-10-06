import { Navigate } from "react-router-dom";
import ROUTER_PATH from "../constant/routerPath";
import { ReactNode } from "react";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const user = localStorage.getItem("userName");
  if (!user) {
    return <Navigate to={ROUTER_PATH.LOGIN} replace />;
  }
  return children;
};

export default RequireAuth;
