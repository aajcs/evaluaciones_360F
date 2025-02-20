import { Space, Table, Button, Tooltip, Tree } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { formatDate } from "../../utils/dateUtils";

const columns = (handleEdit, handleDelete) => [
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
            .map(
              (emp) =>
                `${emp.employeeId?.firstName} ${emp.employeeId?.lastName} (${
                  emp.completed ? `✔ ${emp.result}` : "Pendiente"
                })`
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
    title: "Retroalimentaciones",
    dataIndex: "feedbacks",
    key: "feedbacks",
    render: (feedbacks) => (feedbacks || []).join(", "),
  },
  {
    title: "Preguntas",
    key: "questions",
    render: (record) => {
      if (!record.questions || !record.questions.length) return null;

      const treeData = record.questions.map((q) => ({
        key: q.id,
        title: q.texto,
        children: [
          {
            key: `${q.id}-opciones`,
            title: `Opciones: ${(q.opciones || []).join(", ")}`,
          },
        ],
      }));

      return <Tree treeData={treeData} selectable={false} />;
    },
  },
  {
    title: "Acción",
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

const ListEvaluation = ({ loading, evaluations, handleEdit, handleDelete }) => (
  <Table
    loading={loading}
    columns={columns(handleEdit, handleDelete)}
    dataSource={evaluations}
    rowKey="id"
    size="small"
    scroll={{ x: true }}
  />
);

export default ListEvaluation;
