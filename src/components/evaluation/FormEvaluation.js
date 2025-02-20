import { Modal, Form, Input, Select, Button, DatePicker } from "antd";
import { useEffect } from "react";

const { Option } = Select;

const FormEvaluation = ({
  open,
  onCancel,
  onSubmit,
  form,
  editingEvaluation,
  employees = [],
  evaluators = [],
}) => {
  useEffect(() => {
    if (editingEvaluation) {
      form.setFieldsValue({
        ...editingEvaluation,
        employees: editingEvaluation.employees.map((emp) => emp.employeeId.id),
        evaluatorId: {
          key: editingEvaluation.evaluatorId.id,
          label: editingEvaluation.evaluatorId.userName,
        },
      });
    }
  }, [editingEvaluation, form]);

  return (
    <Modal
      title={editingEvaluation ? "Editar Evaluación" : "Agregar Evaluación"}
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={onSubmit} layout="vertical">
        <Form.Item
          label="Nombre de la Evaluación"
          name="comments"
          rules={[
            {
              required: true,
              message: "Por favor ingresa el nombre de la evaluación",
            },
          ]}
        >
          <Input placeholder="Ingrese el nombre de la evaluación" />
        </Form.Item>
        <Form.Item
          label="Empleados a quien se le aplicará la evaluación"
          name="employees"
          rules={[
            {
              required: true,
              message: "Por favor selecciona un empleado",
            },
          ]}
        >
          <Select placeholder="Seleccione Empleado" mode="multiple">
            {employees.map((employee) => (
              <Option key={employee.id} value={employee.id}>
                {employee.firstName} {employee.lastName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Evaluador"
          name="evaluatorId"
          rules={[
            {
              required: true,
              message: "Por favor selecciona un evaluador",
            },
          ]}
        >
          <Select placeholder="Seleccione Evaluador">
            {evaluators.map((evaluator) => (
              <Option key={evaluator.id} value={evaluator.id}>
                {evaluator.userName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Fecha de Evaluación"
          name="date"
          rules={[
            {
              required: true,
              message: "Por favor ingresa la fecha de evaluación",
            },
          ]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>

        <Form.List name="questions">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div
                  key={field.key}
                  style={{
                    border: "1px solid #ccc",
                    padding: 10,
                    marginBottom: 10,
                  }}
                >
                  <Form.Item
                    {...field}
                    label={`Pregunta ${index + 1} - Texto`}
                    name={[field.name, "texto"]}
                    fieldKey={[field.fieldKey, "texto"]}
                    rules={[
                      {
                        required: true,
                        message: "Ingrese el texto de la pregunta",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.List
                    name={[field.name, "opciones"]}
                    initialValue={["", "", "", "", ""]}
                  >
                    {(optionFields) => (
                      <>
                        {optionFields.map((optionField, optionIndex) => (
                          <Form.Item
                            key={optionField.key}
                            {...optionField}
                            label={`Opción ${optionIndex + 1}`}
                            name={[optionField.name]}
                            fieldKey={[optionField.fieldKey]}
                            rules={[
                              {
                                required: true,
                                message: "Ingrese la opción",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        ))}
                      </>
                    )}
                  </Form.List>

                  <Button
                    danger
                    type="dashed"
                    onClick={() => remove(field.name)}
                  >
                    Eliminar Pregunta
                  </Button>
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Agregar Pregunta
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editingEvaluation ? "Actualizar Evaluación" : "Crear Evaluación"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormEvaluation;
