import { Space, Table, Button, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { formatDate } from "../../utils/dateUtils";

const columns = (handleEdit, handleDelete) => [
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
  },

  {
    title: "Position",
    dataIndex: "position",
    key: "position",
    responsive: ["lg"],
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
    responsive: ["lg"],
  },
  {
    title: "Hire Date",
    dataIndex: "hireDate",
    key: "hireDate",
    render: (hireDate) => formatDate(hireDate),
    responsive: ["lg"],
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
            onClick={() => handleDelete(record)}
          />
        </Tooltip>
      </Space>
    ),
  },
];

const ListEmployee = ({ loading, employees, handleEdit, handleDelete }) => (
  <Table
    loading={loading}
    columns={columns(handleEdit, handleDelete)}
    dataSource={employees}
    rowKey="id"
    size="small"
    scroll={{ x: true }}
  />
);

export default ListEmployee;
