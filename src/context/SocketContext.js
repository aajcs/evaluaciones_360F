import { createContext, useContext, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "./chat/ChatContext";
import { types } from "../types/types";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { online, socket, conectarSocket, desconectarSocket } = useSocket(
    "https://api-360feedback-aa3c087647eb.herokuapp.com"
  );
  const { dispatch } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    if (auth.logged) {
      conectarSocket();
    }
  }, [auth, conectarSocket]);
  useEffect(() => {
    if (!auth.logged) {
      desconectarSocket();
    }
  }, [auth, desconectarSocket]);
  useEffect(() => {
    socket?.on("lista-usuarios", (usuarios) => {
      dispatch({
        type: types.usuariosCargados,
        payload: usuarios,
      });
    });
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ online, socket }}>
      {children}
    </SocketContext.Provider>
  );
};
