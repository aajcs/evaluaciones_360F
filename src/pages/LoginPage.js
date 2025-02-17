import { LockOutlined, MailOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  Typography,
  App as AntdApp,
} from "antd";
import { useContext, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../auth/AuthContext";

const { Title } = Typography;

export const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const { message } = AntdApp.useApp();
  const [loading, setLoading] = useState(false); // Estado para controlar la carga

  const onFinish = async (values) => {
    console.log("Recibido:", values);
    setLoading(true); // Bloquea el botón mientras carga

    try {
      const ok = await login(values.email, values.password);
      console.log("Respuesta del servidor:", ok);

      if (ok) {
        message.success("Inicio de sesión exitoso");
        // Redirigir al usuario después de iniciar sesión
        // history.push("/dashboard");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      message.error(error.message || "Error en el inicio de sesión.");
    } finally {
      setLoading(false); // Habilita el botón de nuevo
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      style={{
        height: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card style={{ width: 400, borderRadius: 10, padding: 20 }} hoverable>
        <div style={{ textAlign: "center" }}>
          <Title level={2} style={{ marginBottom: 24 }}>
            Ingresa
          </Title>

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Por favor ingresa tu correo!" },
              ]}
            >
              <Input
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
                Iniciar Sesión
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div style={{ marginTop: 16 }}>
          ¿No tienes una cuenta?
          <Link to="/auth/register"> Regístrate ahora!</Link>
        </div>
      </Card>
    </Flex>
  );
};
