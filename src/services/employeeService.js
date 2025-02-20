import { apiClientWithToken } from "./apiClient";

export const getEmployeeById = async (id) => {
  try {
    const { data } = await apiClientWithToken.get(`/employees/${id}`);
    return data;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};
export const getEmployees = async () => {
  try {
    const { data } = await apiClientWithToken.get("/employees");
    return data;
  } catch (error) {
    console.error("Error: ", error);
    return [];
  }
};
export const createEmployee = async (user) => {
  try {
    const { data } = await apiClientWithToken.post("/employees/create", user);
    return data;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};
export const updateEmployee = async (id, user) => {
  try {
    const { data } = await apiClientWithToken.put(`/employees/${id}`, user);
    return data;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};
export const deleteEmployee = async (id) => {
  try {
    await apiClientWithToken.delete(`/employees/${id}`);
    return true;
  } catch (error) {
    console.error("Error: ", error);
    return false;
  }
};
