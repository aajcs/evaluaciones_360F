import { Navigate, Outlet } from "react-router";

export const RoleRoute = ({ allowedRoles, authRol }) => {
  // Ejemplo: auth.rol puede ser "ADMIN_ROLE"
  if (!allowedRoles.includes(authRol)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
