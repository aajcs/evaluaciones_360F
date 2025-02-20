import {
  Space,
  Input,
  Button,
  Card,
  Typography,
  Form,
  App as AntdApp,
} from "antd";
import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser } from "../services/userService";
import ListUser from "../components/user/ListUser";
import FormUser from "../components/user/FormUser";

const { Search } = Input;
const { Title } = Typography;

export const UserPage = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingUser, setEditingUser] = useState(null);
  const { message } = AntdApp.useApp();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const allUser = await getUsers();
      setUsers(allUser);
      setFilteredUsers(allUser);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = users.filter((user) => {
      const rowString = Object.values(user).join(" ").toLowerCase();
      return rowString.includes(value.toLowerCase());
    });
    setFilteredUsers(filtered);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      if (editingUser) {
        const updatedUser = await updateUser(editingUser.id, values);
        setUsers(
          users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        setFilteredUsers(
          filteredUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
        message.success("Usuario actualizado exitosamente");
      } else {
        const { user: newUser } = await createUser(values);
        setUsers([...users, newUser]);
        setFilteredUsers([...filteredUsers, newUser]);
        message.success("Usuario creado exitosamente");
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
      message.error("Error al guardar el usuario");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    showModal();
  };

  return (
    <Card>
      <Title type="success">Usuarios Del Sistema</Title>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Buscar en toda la tabla..."
          allowClear
          enterButton="Buscar"
          size="large"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Button type="primary" onClick={showModal}>
          Agregar Usuario
        </Button>
      </Space>
      <ListUser
        loading={loading}
        users={filteredUsers}
        handleEdit={handleEdit}
      />
      <FormUser
        open={isModalVisible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        form={form}
        editingUser={editingUser}
      />
    </Card>
  );
};
