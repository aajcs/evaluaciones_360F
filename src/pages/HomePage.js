import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { Button } from "antd";
import { AuthContext } from "../auth/AuthContext";

function HomePage() {
  const { online } = useContext(SocketContext);
  const { logout } = useContext(AuthContext);

  return (
    <div>
      {online ? <h1>Online</h1> : <h1>Offline</h1>}
      <h1>hola mundo</h1>
      <Button
        type="primary"
        onClick={() => {
          logout();
        }}
      >
        Primary Button
      </Button>
    </div>
  );
}

export default HomePage;
