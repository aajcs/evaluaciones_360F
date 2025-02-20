import { apiClientWithToken } from "./apiClient";

export const getEvaluationById = async (id) => {
  try {
    const { data } = await apiClientWithToken.get(`/evaluations/${id}`);
    return data;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};

export const getEvaluations = async () => {
  try {
    const { data } = await apiClientWithToken.get("/evaluations");
    return data;
  } catch (error) {
    console.error("Error: ", error);
    return [];
  }
};

export const createEvaluation = async (evaluation) => {
  try {
    const { data } = await apiClientWithToken.post("/evaluations", evaluation);
    return data;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};

export const updateEvaluation = async (id, evaluation) => {
  try {
    const { data } = await apiClientWithToken.put(
      `/evaluations/${id}`,
      evaluation
    );
    return data;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};

export const deleteEvaluation = async (id) => {
  try {
    await apiClientWithToken.delete(`/evaluations/${id}`);
    return true;
  } catch (error) {
    console.error("Error: ", error);
    return false;
  }
};

export const getEvaluationsByUserId = async (userId) => {
  try {
    const { data } = await apiClientWithToken.get(
      `/evaluations/user/${userId}`
    );
    return data;
  } catch (error) {
    console.error("Error: ", error);
    return [];
  }
};

export const getEvaluationsByEmployeeId = async (employeeId) => {
  try {
    const { data } = await apiClientWithToken.get(
      `/evaluations/employee/${employeeId}`
    );
    return data;
  } catch (error) {
    console.error("Error: ", error);
    return [];
  }
};
