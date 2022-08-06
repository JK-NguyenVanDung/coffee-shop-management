import api from "../axiosConfig";

const v1 = "/v1/admin";
export const getDishes = async () => {
  try {
    const response = await api.get(`/dishes`);
    return response;
  } catch (err) {
    throw err.message;
  }
};
export const addDish = async (body) => {
    try {
      const response = await api.post(`/dishes`,body);
      return response;
    } catch (err) {
      throw err.message;
    }
  };
  export const editDish = async (props) => {
    try {
      const response = await api.put(`/dishes/${props._id}`,props.body);
      return response;
    } catch (err) {
      throw err.message;
    }
  };
  export const removeDish = async (id) => {
    try {
      const response = await api.delete(`/dishes/${id}`);
      return response;
    } catch (err) {
      throw err.message;
    }
  };