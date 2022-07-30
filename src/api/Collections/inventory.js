import api from "../axiosConfig";
const v1 = "/v1/admin";
export const getInventories = async () => {
  try {
    const response = await api.get(`/storeds`);
    return response;
  } catch (err) {
    throw err.message;
  }
};
export const addInventory = async (body) => {
    try {
      const response = await api.post(`/storeds`,body);
      return response;
    } catch (err) {
      throw err.message;
    }
  };
  export const editInventory = async (props) => {
    try {
      const response = await api.put(`/storeds/${props._id}`,props.body);
      return response;
    } catch (err) {
      throw err.message;
    }
  };
  export const removeInventory = async (id) => {
    try {
      const response = await api.delete(`/storeds/${id}`);
      return response;
    } catch (err) {
      throw err.message;
    }
  };