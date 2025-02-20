import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { Tag } from "antd";
import Card from "antd/es/card/Card";

export const HomePage = () => {
  const { online } = useContext(SocketContext);

  return (
    <Card>
      <Tag color={online ? "green" : "red"}>
        {online ? "Online" : "Offline"}
      </Tag>
    </Card>
  );
};
