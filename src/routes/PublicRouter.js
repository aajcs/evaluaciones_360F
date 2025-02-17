import { Navigate, Outlet } from "react-router";

export const PublicRouter = ({ isAuthenticated }) => {
  // Si no está autenticado, redirigir al login
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Si está autenticado, renderizar el contenido
  return <Outlet />;
};
