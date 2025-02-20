import { apiClientWithToken } from "./apiClient";

export const getAnswerEvaluationById = async (id) => {
  try {
    const { data } = await apiClientWithToken.get(`/answers/${id}`);
    return data;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};
export const getAnswerEvaluations = async () => {
  try {
    const { data } = await apiClientWithToken.get("/answers");
    return data;
  } catch (error) {
    console.error("Error: ", error);
    return [];
  }
};
export const createAnswerEvaluation = async (user) => {
  try {
    const { data } = await apiClientWithToken.post("/answers", user);
    return data;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};
export const updateAnswerEvaluation = async (id, user) => {
  try {
    const { data } = await apiClientWithToken.put(`/answers/${id}`, user);
    return data;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};
export const deleteAnswerEvaluation = async (id) => {
  try {
    await apiClientWithToken.delete(`/answers/${id}`);
    return true;
  } catch (error) {
    console.error("Error: ", error);
    return false;
  }
};
//
