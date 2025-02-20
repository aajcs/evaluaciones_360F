import { Modal, Form, Input, Select, Button } from "antd";

const { Option } = Select;

const FormUser = ({ open, onCancel, onSubmit, form, editingUser }) => (
  <Modal
    title={editingUser ? "Editar Usuario" : "Agregar Nuevo Usuario"}
    open={open}
    onCancel={onCancel}
    footer={null}
  >
    <Form form={form} onFinish={onSubmit}>
      <Form.Item
        label="Nombre de Usuario"
        name="userName"
        rules={[
          {
            required: true,
            message: "Por favor ingresa el nombre de usuario",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Correo Electrónico"
        name="email"
        rules={[
          {
            required: true,
            message: "Por favor ingresa el correo electrónico",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Contraseña"
        name="password"
        rules={[
          {
            required: true,
            message: "Por favor ingresa la contraseña",
          },
        ]}
      >
        <Input type="password" />
      </Form.Item>
      <Form.Item
        label="Rol"
        name="role"
        rules={[{ required: true, message: "Por favor selecciona un rol" }]}
      >
        <Select>
          <Option value="EMPLOYEE_ROLE">Empleado</Option>
          <Option value="MANAGER_ROLE">Gerente</Option>
          <Option value="ADMIN_ROLE">Administrador</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {editingUser ? "Actualizar Usuario" : "Crear Usuario"}
        </Button>
      </Form.Item>
    </Form>
  </Modal>
);

export default FormUser;
