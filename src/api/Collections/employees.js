import api from "../axiosConfig";
const v1 = "/v1/admin";
export const getEmployees = async () => {
  try {
    const response = await api.get(`/accounts`);
    return response;
  } catch (err) {
    throw err.message;
  }
};
export const addEmployee = async (body) => {
    try {
      const response = await api.post(`/accounts`,body);
      return response;
    } catch (err) {
      throw err.message;
    }
  };
  export const editEmployee = async (props) => {
    try {
      const response = await api.put(`/accounts/${props._id}`,props.body);
      return response;
    } catch (err) {
      throw err.message;
    }
  };
  export const removeEmployee = async (id) => {
    try {
      const response = await api.delete(`/accounts/${id}`);
      return response;
    } catch (err) {
      throw err.message;
    }
  };