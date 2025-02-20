import {
  Space,
  Input,
  Button,
  Card,
  Typography,
  Form,
  Spin,
  App as AntdApp,
} from "antd";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  getEvaluations,
  createEvaluation,
  updateEvaluation,
} from "../services/evaluationService";
import ListEvaluation from "../components/evaluation/ListEvaluation";
import FormEvaluation from "../components/evaluation/FormEvaluation";
import { getUsers } from "../services/userService";
import dayjs from "dayjs";
import { parseISO } from "date-fns";
import { getEmployees } from "../services/employeeService";
import ListMeEvaluation from "../components/evaluation/ListMeEvaluation";
import FormAnswerEvaluation from "../components/evaluation/FormAnswerEvaluation";
import { createAnswerEvaluation } from "../services/answerEvaluation";
import { AuthContext } from "../auth/AuthContext";

const { Search } = Input;
const { Title } = Typography;
const authorizedRoles = ["ADMIN_ROLE", "MANAGER_ROLE"];
export const EvaluationsPage = () => {
  const [loading, setLoading] = useState(true);
  const [evaluations, setEvaluations] = useState([]);
  const [answerEvaluation, setAnswerEvaluation] = useState([]);
  const [filteredEvaluations, setFilteredEvaluations] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleAnswer, setIsModalVisibleAnswer] = useState(false);
  const [form] = Form.useForm();
  const [formAnswer] = Form.useForm();
  const [editingEvaluation, setEditingEvaluation] = useState(null);
  const [answeringEvaluation, setAnsweringEvaluation] = useState(null);
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const { auth } = useContext(AuthContext);
  const { message } = AntdApp.useApp();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const [allEvaluation, allUser, allEmployee] = await Promise.all([
        getEvaluations(),
        getUsers(),
        getEmployees(),
      ]);
      setEmployees(allEmployee);
      setEvaluations(allEvaluation);
      setFilteredEvaluations(allEvaluation);
      const filterAnswer = allEvaluation.filter((evaluation) =>
        evaluation.employees.some(
          (employee) => employee.employeeId?.userId === auth.id
        )
      );
      setAnswerEvaluation(filterAnswer);
      setUsers(
        allUser.filter(
          (user) => user.role === "ADMIN_ROLE" || user.role === "MANAGER_ROLE"
        )
      );
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setLoading(false);
    }
  }, [auth.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = evaluations.filter((evaluation) => {
      const rowString = Object.values(evaluation).join(" ").toLowerCase();
      return rowString.includes(value.toLowerCase());
    });
    setFilteredEvaluations(filtered);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showModalAnswer = () => {
    setIsModalVisibleAnswer(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingEvaluation(null);
    form.resetFields();
  };

  const handleCancelAnswer = () => {
    setIsModalVisibleAnswer(false);
    setAnsweringEvaluation(null);
    formAnswer.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      if (editingEvaluation) {
        const updatedEvaluation = await updateEvaluation(
          editingEvaluation.id,
          values
        );
        setEvaluations(
          evaluations.map((evaluation) =>
            evaluation.id === updatedEvaluation.id
              ? updatedEvaluation
              : evaluation
          )
        );
        setFilteredEvaluations(
          filteredEvaluations.map((evaluation) =>
            evaluation.id === updatedEvaluation.id
              ? updatedEvaluation
              : evaluation
          )
        );
        message.success("Evaluación actualizada exitosamente");
        setIsModalVisible(false);
        form.resetFields();
      } else {
        values = {
          ...values,
          employees: values.employees.map((emp) => ({
            employeeId: emp,
            result: "",
            completed: false,
          })),
        };

        const newEvaluation = await createEvaluation(values);
        if (newEvaluation) {
          setEvaluations([...evaluations, newEvaluation]);
          setFilteredEvaluations([...filteredEvaluations, newEvaluation]);
          message.success("Evaluación creada exitosamente");
          setIsModalVisible(false);
          form.resetFields();
        } else {
          message.error("Error al guardar la evaluación");
        }
      }
    } catch (error) {
      console.error("Error al guardar la evaluación:", error);
      message.error("Error al guardar la evaluación");
    }
  };

  const handleSubmitAnswer = async (answers) => {
    try {
      console.log("Respuestas enviadas al backend:", answers);
      const newAnswers = await createAnswerEvaluation({ answers });
      console.log(newAnswers);
      // Aquí puedes enviar las respuestas al backend
      message.success("Respuestas enviadas exitosamente");
      setIsModalVisibleAnswer(false);
      formAnswer.resetFields();
      setIsCalculating(true);
      setTimeout(() => {
        fetchData();
        setIsCalculating(false);
      }, 4000); // Esperar 4 segundos antes de llamar a fetchData
    } catch (error) {
      console.error("Error al enviar las respuestas:", error);
      message.error("Error al enviar las respuestas");
      setIsCalculating(false);
    }
  };

  const handleEdit = (evaluation) => {
    const evaluationWithValidDates = {
      ...evaluation,
      date: evaluation.date ? dayjs(parseISO(evaluation.date)) : null,
    };
    setEditingEvaluation(evaluationWithValidDates);
    form.setFieldsValue(evaluationWithValidDates);
    showModal();
  };

  const handleAnswers = (evaluation) => {
    const evaluationWithValidDates = {
      ...evaluation,
      date: evaluation.date ? dayjs(parseISO(evaluation.date)) : null,
    };
    setAnsweringEvaluation(evaluationWithValidDates);
    formAnswer.setFieldsValue(evaluationWithValidDates);
    showModalAnswer();
  };

  const handleDelete = (evaluation) => {
    console.log("Eliminar", evaluation);
    message.error(
      `Error al eliminar la evaluación: ${evaluation.firstName} ${evaluation.lastName} // función no implementada`
    );
  };

  return (
    <Card>
      <Title type="success">Evaluaciones</Title>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Buscar en toda la tabla..."
          allowClear
          enterButton="Buscar"
          size="large"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {authorizedRoles.includes(auth.role) && (
          <Button
            type="primary"
            style={{ backgroundColor: "#1ABC9C", borderColor: "#1ABC9C" }}
            onClick={showModal}
          >
            Agregar Evaluación
          </Button>
        )}
      </Space>
      {isCalculating ? (
        <Spin tip="Calculando la evaluación, por favor espere..." fullscreen />
      ) : (
        <>
          <ListMeEvaluation
            loading={loading}
            evaluations={answerEvaluation}
            handleAnswers={handleAnswers}
            handleDelete={handleDelete}
            authId={auth.id}
          />
          {authorizedRoles.includes(auth.role) && (
            <ListEvaluation
              loading={loading}
              evaluations={filteredEvaluations}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
        </>
      )}
      <FormEvaluation
        open={isModalVisible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        form={form}
        editingEvaluation={editingEvaluation}
        evaluators={users}
        employees={employees}
      />

      <FormAnswerEvaluation
        open={isModalVisibleAnswer}
        onCancel={handleCancelAnswer}
        onSubmit={handleSubmitAnswer}
        form={formAnswer}
        evaluation={answeringEvaluation}
        userID={auth.id}
      />
    </Card>
  );
};
