import { Modal, Form, Button, Radio } from "antd";
import { useEffect } from "react";

const FormAnswerEvaluation = ({
  open,
  onCancel,
  onSubmit,
  form,
  evaluation,
  userID,
}) => {
  useEffect(() => {
    if (evaluation) {
      form.setFieldsValue({
        answers: evaluation.questions.map((question) => ({
          questionId: question.id,
          selectedAnswer: null,
        })),
      });
    }
  }, [evaluation, form]);

  const handleFinish = (values) => {
    console.log(evaluation);
    const answers = values.answers.map((answer, index) => {
      const employee = evaluation.employees.find(
        (emp) => emp.employeeId.userId === userID
      );
      return {
        questionId: evaluation.questions[index].id,
        userID,
        evaluationId: evaluation.id,
        selectedAnswer: answer.selectedAnswer,
        employeeId: employee ? employee.employeeId.id : null,
      };
    });
    onSubmit(answers);
  };

  return (
    <Modal
      title="Responder Evaluación"
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={handleFinish} layout="vertical">
        {evaluation?.questions.map((question, index) => (
          <Form.Item
            key={question.id}
            label={`Pregunta ${index + 1}: ${question.texto}`}
            name={["answers", index, "selectedAnswer"]}
            rules={[
              {
                required: true,
                message: "Por favor selecciona una respuesta",
              },
            ]}
          >
            <Radio.Group style={{ display: "flex", flexDirection: "column" }}>
              {question.opciones.map((opcion, opcionIndex) => (
                <Radio key={opcionIndex} value={opcion}>
                  {opcion}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Enviar Respuestas
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormAnswerEvaluation;
