import { Modal, Form, Input, Select, Button, DatePicker } from "antd";

const { Option } = Select;

const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance"];

const FormEmployee = ({
  open,
  onCancel,
  onSubmit,
  form,
  editingEmployee,
  users,
}) => {
  return (
    <Modal
      title={editingEmployee ? "Editar Usuario" : "Agregar Nuevo Usuario"}
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={onSubmit}>
        <Form.Item
          label="Usuario"
          name="userId"
          rules={[
            {
              required: true,
              message: "Por favor selecciona un usuario",
            },
          ]}
        >
          <Select>
            {users.map((user) => (
              <Option key={user.id} value={user.id}>
                {user.email}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Nombre"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Por favor ingresa el nombre",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Apellido"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Por favor ingresa el apellido",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Posición"
          name="position"
          rules={[
            {
              required: true,
              message: "Por favor ingresa la posición",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Departamento"
          name="department"
          rules={[
            {
              required: true,
              message: "Por favor selecciona un departamento",
            },
          ]}
        >
          <Select>
            {departments.map((dept) => (
              <Option key={dept} value={dept}>
                {dept}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Fecha de Contratación"
          name="hireDate"
          rules={[
            {
              required: true,
              message: "Por favor ingresa la fecha de contratación",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editingEmployee ? "Actualizar Usuario" : "Crear Usuario"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormEmployee;
