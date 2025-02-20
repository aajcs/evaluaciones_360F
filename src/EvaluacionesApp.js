import React from "react";
import { SocketProvider } from "./context/SocketContext";
import { AppRouter } from "./routes/AppRouter";
import { AuthProvider } from "./auth/AuthContext";
import { ConfigProvider } from "antd";
import { App as AntdApp } from "antd";
import { ChatProvider } from "./context/chat/ChatContext";

export const EvaluacionesApp = () => {
  return (
    <AntdApp>
      <ConfigProvider
        theme={{
          token: {
            // Colores principales
            colorPrimary: "#2C3E50", // Azul oscuro (primario)
            colorInfo: "#3498DB", // Azul claro (secundario)
            colorSuccess: "#1ABC9C", // Verde azulado (acento)
            colorWarning: "#E67E22", // Naranja (opcional para alertas)
            colorError: "#E74C3C", // Rojo (para errores)

            // Colores de fondo y texto
            colorBgContainer: "#FFFFFF", // Fondo de los contenedores (blanco)
            colorText: "#333333", // Texto oscuro
            colorBgLayout: "#F5F6F7", // Fondo del layout (gris claro)

            // Bordes y esquinas
            borderRadius: 4, // Bordes redondeados
          },
          components: {
            Layout: {
              headerBg: "#2C3E50", // Fondo del Header (azul oscuro)
              footerBg: "#2C3E50", // Fondo del Footer (azul oscuro)
              bodyBg: "#F5F6F7", // Fondo del Layout (gris claro)
              siderBg: "#34495E", // Fondo del Sider (azul oscuro ligeramente más claro)
              colorText: "#ffffff", // Texto Blanco
            },
            Menu: {
              itemBg: "#34495E", // Fondo del menú (igual que el Sider)
              itemColor: "#FFFFFF", // Texto del menú (blanco)
              itemSelectedColor: "#1ABC9C", // Texto seleccionado (verde azulado)
              itemSelectedBg: "#2C3E50", // Fondo seleccionado (azul oscuro)
            },
            Button: {
              colorPrimary: "#1abc9c", // Botón primario
              colorPrimaryHover: "#16A085", // Hover del botón primario
            },
            Card: {
              colorBgContainer: "#2C3E50",
              colorText: "#ffffff",
              borderRadiusLG: "1rem",
            },
            Pagination: {
              colorText: "#1abc9c",
              colorTextDisabled: "#1abc9c",
            },
          },
        }}
      >
        <ChatProvider>
          <AuthProvider>
            <SocketProvider>
              <AppRouter />
            </SocketProvider>
          </AuthProvider>
        </ChatProvider>
      </ConfigProvider>
    </AntdApp>
  );
};
