import api from "../axiosConfig";
const v1 = "/v1/admin";
export const getCategories = async () => {
  try {
    const response = await api.get(`/dishTypes`);
    return response;
  } catch (err) {
    throw err.message;
  }
};
export const addCategory= async (body) => {
    try {
      const response = await api.post(`/dishType`,body);
      return response;
    } catch (err) {
      throw err.message;
    }
  };
  export const editCategory= async (props) => {
    try {
      const response = await api.put(`/dishType/${props._id}`,props.body);
      return response;
    } catch (err) {
      throw err.message;
    }
  };
  export const removeCategory= async (id) => {
    try {
      const response = await api.delete(`/dishType/${id}`);
      return response;
    } catch (err) {
      throw err.message;
    }
  };