import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

function HomePage() {
  const { online } = useContext(SocketContext);

  return (
    <div>
      {online ? <h1>Online</h1> : <h1>Offline</h1>}
      <h1>hola mundo</h1>
    </div>
  );
}

export default HomePage;
