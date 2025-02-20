import { Space, Table, Button, Tooltip } from "antd";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { formatDate } from "../../utils/dateUtils";

const columns = (handleAnswers, handleDelete, authId) => [
  {
    title: "Nombre de la Evaluación",
    dataIndex: "comments",
    key: "comments",
  },
  {
    title: "Empleado",
    dataIndex: "employees",
    key: "employees",
    render: (employees) =>
      employees && employees.length > 0
        ? employees
            .filter((emp) => emp.employeeId.userId === authId)
            .map(
              (emp) =>
                `${emp.employeeId?.firstName} ${emp.employeeId?.lastName} `
            )
            .join(", ")
        : "",
  },
  {
    title: "Estatus",
    dataIndex: "employees",
    key: "employees",
    render: (employees) =>
      employees && employees.length > 0
        ? employees
            .filter((emp) => emp.employeeId.userId === authId)
            .map(
              (emp) => `(${emp.completed ? `✔ ${emp.result}` : "Pendiente"}) `
            )
            .join(", ")
        : "",
  },

  {
    title: "Evaluador",
    dataIndex: "evaluatorId",
    key: "evaluatorId",
    render: (evaluator) => (evaluator ? evaluator.userName : ""),
  },
  {
    title: "Fecha de Evaluación",
    dataIndex: "date",
    key: "date",
    render: (date) => formatDate(date),
  },
  {
    title: "Acción",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Tooltip title="Realizar Evaluación">
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={() => handleAnswers(record)}
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

const ListMeEvaluation = ({
  loading,
  evaluations,
  handleAnswers,
  handleDelete,
  authId,
}) => (
  <Table
    loading={loading}
    columns={columns(handleAnswers, handleDelete, authId)}
    dataSource={evaluations}
    rowKey="id"
    size="small"
    scroll={{ x: true }}
  />
);

export default ListMeEvaluation;
