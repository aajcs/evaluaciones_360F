import React from "react";
import { SocketProvider } from "./context/SocketContext";
import { AppRouter } from "./routes/AppRouter";
import { AuthProvider } from "./auth/AuthContext";

export const EvaluacionesApp = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <AppRouter />
      </SocketProvider>
    </AuthProvider>
  );
};
