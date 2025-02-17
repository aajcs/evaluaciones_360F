import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

export const useSocket = (serverPath) => {
  const [online, setOnline] = useState(false);
  const [socket, setSocket] = useState(null);
  const conectarSocket = useCallback(() => {
    const socketTemp = io.connect(serverPath, {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true,
    });
    setSocket(socketTemp);
  }, [serverPath]);
  const desconectarSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });

    socket.on("disconnect", () => {
      setOnline(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);

  return { socket, online, conectarSocket, desconectarSocket };
};
