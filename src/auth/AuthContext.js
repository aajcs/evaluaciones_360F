import { createContext, useCallback, useState } from "react";
import { apiClient, apiClientWithToken } from "../services/apiClient";

const initialAuthState = {
  id: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialAuthState);

  const login = async (email, password) => {
    try {
      const response = await apiClient.post("/user/login", { email, password });

      if (!response.data || !response.data.user || !response.data.token) {
        throw new Error("Respuesta del servidor inválida.");
      }

      const { user, token } = response.data;

      localStorage.setItem("token", token);

      setAuth({
        id: user.id,
        checking: false,
        logged: true,
        name: user.userName,
        email: user.email,
      });

      return true;
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);

      setAuth(initialAuthState);
      localStorage.removeItem("token");

      throw new Error(
        error.response?.data?.message || "Error en el inicio de sesión."
      );
    }
  };

  const register = async (userName, email, password) => {
    try {
      const response = await apiClient.post("/user", {
        userName,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error en el registro.");
    }
  };

  const verifyToken = useCallback(async () => {
    try {
      const tokenActual = localStorage.getItem("token");
      if (!tokenActual) throw new Error("No hay token disponible.");

      const response = await apiClientWithToken.get("/user/validate");

      if (!response.data || !response.data.user) {
        throw new Error("Token inválido.");
      }
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      setAuth({
        id: user.id,
        checking: false,
        logged: true,
        name: user.userName,
        email: user.email,
      });

      return true;
    } catch (error) {
      console.error("Error verificando token:", error);
      setAuth({
        id: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
      localStorage.removeItem("token");
      return false;
    }
  }, []);

  const logout = () => {
    setAuth({
      id: null,
      checking: false,
      logged: false,
      name: null,
      email: null,
    });
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ auth, login, register, verifyToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
