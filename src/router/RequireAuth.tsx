import { Navigate } from "react-router-dom";
import ROUTER_PATH from "../constant/routerPath";
import { ReactNode, useContext } from "react";
import { AuthContext, AuthContextType } from "../context/authContext";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const auth = useContext(AuthContext);
  const { user } = auth as AuthContextType;
  if (!user) {
    return <Navigate to={ROUTER_PATH.LOGIN} replace />;
  }
  return children;
};

export default RequireAuth;
