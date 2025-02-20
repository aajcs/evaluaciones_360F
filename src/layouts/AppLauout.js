import {
  LogoutOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, Space } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { createElement, useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { AuthContext } from "../auth/AuthContext";

const items = [
  { key: "1", icon: UserOutlined, label: "Evaluaciones", path: "/evaluations" },
  {
    key: "2",
    icon: VideoCameraOutlined,
    label: "Empleados",
    path: "/employee",
  },
  { key: "3", icon: UploadOutlined, label: "Usuarios", path: "/user" },
].map((item) => ({
  key: item.key,
  icon: createElement(item.icon),
  label: item.label,
  path: item.path,
}));

export const AppLayout = ({ auth }) => {
  const { logout } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const [breakpoint, setBreakpoint] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    const item = items.find((item) => item.key === e.key);
    if (item) {
      navigate(item.path);
    }
  };

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Perfil",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Cerrar sesión",
      onClick: () => {
        logout();
      },
    },
  ];

  const userMenu = {
    items: userMenuItems,
  };

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          height: "3rem",
          lineHeight: "3rem",
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
        }}
      >
        <Space>
          <img
            src="/360Logo.png" // Ruta de la imagen del logo
            alt="Logo"
            style={{ width: "32px", height: "32px" }}
          />
          <span
            style={{ fontSize: "18px", marginLeft: "8px", fontWeight: "bold" }}
          >
            360<span style={{ color: "#199cd5" }}>Feed</span>Back
          </span>
        </Space>
        <Dropdown menu={userMenu} trigger={["click"]}>
          <Space style={{ cursor: "pointer" }}>
            <Avatar icon={<UserOutlined />} />
            <span>{auth.name}</span>
            <span>{auth.role}</span>
          </Space>
        </Dropdown>
      </Header>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            setBreakpoint(broken);
          }}
          onCollapse={(collapsed, type) => {
            setCollapsed(collapsed);
          }}
          width={200}
          style={{
            position: "fixed",
            width: "14rem",
            display: "flex",
            flexDirection: "column",
            height: "calc(100% - 7rem)",
            left: collapsed ? "-1rem" : 0,
            top: "3rem",
            userSelect: "none",
            zIndex: 999,
            padding: collapsed ? 0 : "1rem 1.3rem",
            margin: "1rem ",
            borderRadius: "1rem",
          }}
        >
          <Menu
            onClick={handleMenuClick}
            mode="inline"
            items={items} // Cambio realizado aquí
          />
        </Sider>
        <Layout
          style={{ marginLeft: breakpoint ? 0 : "14rem", marginTop: "3rem" }}
        >
          <Content style={{ padding: "1rem", minHeight: "calc(100vh - 5rem)" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <Footer
        style={{ textAlign: "center", height: "2rem", padding: "5px 10px" }}
      >
        Footer Normal
      </Footer>
    </Layout>
  );
};
