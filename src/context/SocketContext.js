import { createContext, useContext, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { AuthContext } from "../auth/AuthContext";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { online, socket, conectarSocket, desconectarSocket } = useSocket(
    "http://localhost:3001"
  );
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

  return (
    <SocketContext.Provider value={{ online, socket }}>
      {children}
    </SocketContext.Provider>
  );
};
