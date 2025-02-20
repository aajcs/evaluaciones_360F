import { Space, Table, Tag, Button, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { formatDate } from "../../utils/dateUtils";

const roleLabels = {
  EMPLOYEE_ROLE: "Empleado",
  MANAGER_ROLE: "Gerente",
  ADMIN_ROLE: "Administrador",
};

const columns = (handleEdit) => [
  {
    title: "User Name",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    responsive: ["lg"],
    ellipsis: true,
    filters: [
      {
        text: "gmail.com",
        value: "gmail.com",
      },
      {
        text: "hotmail.com",
        value: "hotmail.com",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.email.includes(value),
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    responsive: ["lg"],
    render: (role) => roleLabels[role] || role,
    filters: [
      {
        text: "Employee",
        value: "EMPLOYEE_ROLE",
      },
      {
        text: "Admin",
        value: "ADMIN_ROLE",
      },
    ],
    onFilter: (value, record) => record.role === value,
  },
  {
    title: "Online",
    dataIndex: "online",
    key: "online",
    render: (online) => (
      <Tag color={online ? "green" : "red"}>
        {online ? "Online" : "Offline"}
      </Tag>
    ),
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt) => formatDate(createdAt),
    responsive: ["lg"],
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (updatedAt) => formatDate(updatedAt),
    responsive: ["lg"],
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Tooltip title="Editar">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
        </Tooltip>
        <Tooltip title="Eliminar">
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => console.log("Eliminar", record)}
          />
        </Tooltip>
      </Space>
    ),
  },
];

const ListUser = ({ loading, users, handleEdit }) => (
  <Table
    loading={loading}
    columns={columns(handleEdit)}
    dataSource={users}
    rowKey="id"
    size="small"
    scroll={{ x: true }}
  />
);

export default ListUser;
