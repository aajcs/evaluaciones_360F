import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Typography, App as AntdApp } from "antd";
import { useContext, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../auth/AuthContext";

const { Title } = Typography;

export const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const { message } = AntdApp.useApp();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log("Recibido:", values);
    setLoading(true);

    try {
      const ok = await register(values.userName, values.email, values.password);

      if (ok) {
        message.success("Registro exitoso");
        // Redirigir al usuario después de registrarse
        // history.push("/dashboard");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      message.error(error.message || "Error en el registro.");
    } finally {
      setLoading(false); // Habilita el botón de nuevo
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card style={{ width: 400, borderRadius: 10, padding: 20 }} hoverable>
        <div style={{ textAlign: "center" }}>
          <Title level={2} style={{ marginBottom: 24 }}>
            Regístrate
          </Title>

          <Form
            name="register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="userName"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa tu nombre de usuario!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Nombre de usuario"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Por favor ingresa tu correo!" },
              ]}
            >
              <Input
                name="username"
                prefix={<MailOutlined />}
                placeholder="Correo electrónico"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Por favor ingresa tu contraseña!" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Contraseña"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={loading}
              >
                Registrarse
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div style={{ marginTop: 16 }}>
          ¿Ya tienes una cuenta?
          <Link to="/auth/login"> Inicia sesión ahora!</Link>
        </div>
      </Card>
    </div>
  );
};
