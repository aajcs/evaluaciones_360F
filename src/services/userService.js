import { apiClientWithToken } from "./apiClient";

export const getUserById = async (id) => {
  try {
    const { data } = await apiClientWithToken.get(`/auth/${id}`);
    return data;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};
export const getUsers = async () => {
  try {
    const { data } = await apiClientWithToken.get("/auth");
    return data;
  } catch (error) {
    console.error("Error: ", error);
    return [];
  }
};
export const createUser = async (user) => {
  try {
    const { data } = await apiClientWithToken.post("/auth/register", user);
    return data;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};
export const updateUser = async (id, user) => {
  try {
    const { data } = await apiClientWithToken.put(`/auth/${id}`, user);
    return data;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};
export const deleteUser = async (id) => {
  try {
    await apiClientWithToken.delete(`/auth/${id}`);
    return true;
  } catch (error) {
    console.error("Error: ", error);
    return false;
  }
};
