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
import {
  getEmployees,
  createEmployee,
  updateEmployee,
} from "../services/employeeService";
import ListEmployee from "../components/employee/ListEmployee";
import FormEmployee from "../components/employee/FormEmployee";
import { getUsers } from "../services/userService";
import dayjs from "dayjs";
import { parseISO } from "date-fns";

const { Search } = Input;
const { Title } = Typography;

export const EmployeePage = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [users, setUsers] = useState([]);

  const { message } = AntdApp.useApp();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setLoading(true);

      const [allEmployee, allUser] = await Promise.all([
        getEmployees(),
        getUsers(),
      ]);

      setEmployees(allEmployee);
      setFilteredEmployees(allEmployee);
      setUsers(allUser);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = employees.filter((employee) => {
      const rowString = Object.values(employee).join(" ").toLowerCase();
      return rowString.includes(value.toLowerCase());
    });
    setFilteredEmployees(filtered);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingEmployee(null);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      if (editingEmployee) {
        const updatedEmployee = await updateEmployee(
          editingEmployee.id,
          values
        );
        setEmployees(
          employees.map((employee) =>
            employee.id === updatedEmployee.id ? updatedEmployee : employee
          )
        );
        setFilteredEmployees(
          filteredEmployees.map((employee) =>
            employee.id === updatedEmployee.id ? updatedEmployee : employee
          )
        );
        message.success("Usuario actualizado exitosamente");
      } else {
        const newEmployee = await createEmployee(values);
        setEmployees([...employees, newEmployee]);
        setFilteredEmployees([...filteredEmployees, newEmployee]);
        message.success("Usuario creado exitosamente");
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
      message.error("Error al guardar el usuario");
    }
  };

  const handleEdit = (employee) => {
    // Asegúrate de que las fechas sean objetos de fecha válidos
    const employeeWithValidDates = {
      ...employee,
      hireDate: employee.hireDate ? dayjs(parseISO(employee.hireDate)) : null,
    };
    setEditingEmployee(employeeWithValidDates);
    form.setFieldsValue(employeeWithValidDates);
    showModal();
  };

  const handleDelete = (employee) => {
    console.log("Eliminar", employee);
    message.error(
      `Error al eliminar el empleado: ${employee.firstName} ${employee.lastName} // funcion no implementada`
    );
  };

  return (
    <Card>
      <Title type="success">Empleados</Title>
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
      <ListEmployee
        loading={loading}
        employees={filteredEmployees}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <FormEmployee
        open={isModalVisible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        form={form}
        editingEmployee={editingEmployee}
        users={users}
      />
    </Card>
  );
};
