import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";
import { AuthContext } from "../auth/AuthContext";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { PrivateRoute } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { RoleRoute } from "./RoleRoute";
import { AppLayout } from "../layouts/AppLauout";
import { EmployeePage } from "../pages/EmployeePage";
import { EvaluationsPage } from "../pages/EvaluationsPage";
import { UserPage } from "../pages/UserPage";
import { HomePage } from "../pages/HomePage";

export const AppRouter = () => {
  const { auth, verifyToken } = useContext(AuthContext);
  const AuthLayout = () => {
    return (
      <div>
        <h2>Auth Layout</h2>
        <Outlet /> {/* Renderiza rutas hijas */}
      </div>
    );
  };

  const ChatLayout = () => {
    return (
      <div>
        <h2>Chat Layout</h2>
        <Outlet />
      </div>
    );
  };

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  if (auth.checking) {
    return (
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 48,
            }}
            spin
          />
        }
        fullscreen
      />
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRouter isAuthenticated={auth.logged} />}>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/auth/login" replace />} />
          </Route>
        </Route>

        {/* Rutas privadas */}

        <Route element={<PrivateRoute isAuthenticated={auth.logged} />}>
          <Route path="/" element={<AppLayout auth={auth} />}>
            <Route index element={<HomePage />} />
            {/* Solo MANAGER_ROLE */}
            <Route
              element={
                <RoleRoute
                  allowedRoles={["ADMIN_ROLE", "MANAGER_ROLE"]}
                  authRol={auth.role}
                />
              }
            >
              <Route path="employee" element={<EmployeePage />} />
            </Route>
            {/* Solo ADMIN_ROLE */}
            <Route
              element={
                <RoleRoute allowedRoles={["ADMIN_ROLE"]} authRol={auth.role} />
              }
            >
              <Route path="user" element={<UserPage />} />
            </Route>
            <Route path="evaluations" element={<EvaluationsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
