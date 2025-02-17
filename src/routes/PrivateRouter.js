import { Navigate, Outlet } from "react-router";

export const PrivateRoute = ({ isAuthenticated }) => {
  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // Si está autenticado, renderizar el contenido
  return <Outlet />;
};
