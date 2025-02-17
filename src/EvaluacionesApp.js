import React from "react";
import { SocketProvider } from "./context/SocketContext";
import { AppRouter } from "./routes/AppRouter";
import { AuthProvider } from "./auth/AuthContext";
import { ConfigProvider } from "antd";
import { App as AntdApp } from "antd";

export const EvaluacionesApp = () => {
  return (
    <AntdApp>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#00b96b",
            colorInfo: "#1abc9c",
            borderRadius: 2,

            // Alias Token
            colorBgContainer: "#f6ffed",
            colorText: "#4B4B4B",
          },
        }}
      >
        <AuthProvider>
          <SocketProvider>
            <AppRouter />
          </SocketProvider>
        </AuthProvider>
      </ConfigProvider>
    </AntdApp>
  );
};
