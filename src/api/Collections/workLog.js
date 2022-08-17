import api from "../axiosConfig";
const v1 = "/v1/admin";
export const getWorkLogs= async (id) => {
  try {
    const response = await api.get(`/workLogs/${id}`);
    return response;
  } catch (err) {
    throw err.message;
  }
};
export const getSingleWorkLog = async (body) => {
  try {
    const response = await api.post(`/workLogs/showWorkLogPerAccount`,body);
    return response;
  } catch (err) {
    throw err.message;
  }
};
export const addWorkLog = async (body) => {
    try {
      const response = await api.post(`/workLogs`,body);
      return response;
    } catch (err) {
      throw err.message;
    }
  };
  export const editWorkLog = async (props) => {
    try {
      const response = await api.put(`/workLogs/${props._id}`,props.body);
      return response;
    } catch (err) {
      throw err.message;
    }
  };
  export const removeWorkLog = async (id) => {
    try {
      const response = await api.delete(`/workLogs/${id}`);
      return response;
    } catch (err) {
      throw err.message;
    }
  };