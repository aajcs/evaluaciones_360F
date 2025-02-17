import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "../pages/HomePage";
import { AuthRouter } from "./AuthRouter";
import { AuthContext } from "../auth/AuthContext";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { PrivateRoute } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";

export const AppRouter = () => {
  const { auth, verifyToken } = useContext(AuthContext);

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
        <Route element={<PrivateRoute isAuthenticated={auth.logged} />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<PublicRouter isAuthenticated={auth.logged} />}>
          <Route
            path="/auth/*"
            element={<AuthRouter isAuthenticated={auth.logged} />}
          />
        </Route>

        {/* Rutas privadas */}

        <Route path="/dashboard" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};
