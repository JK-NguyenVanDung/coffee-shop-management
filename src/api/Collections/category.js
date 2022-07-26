import api from "../axiosConfig";
const v1 = "/v1/admin";
export const getCategories = async () => {
  try {
    const response = await api.get(`/DishTypes`);
    return response;
  } catch (err) {
    throw err.message;
  }
};
export const addCategory= async (body) => {
    try {
      const response = await api.post(`/DishTypes`,body);
      return response;
    } catch (err) {
      throw err.message;
    }
  };
  export const editCategory= async (props) => {
    try {
      const response = await api.put(`/DishTypes/${props._id}`,props.body);
      return response;
    } catch (err) {
      throw err.message;
    }
  };
  export const removeCategory= async (id) => {
    try {
      const response = await api.delete(`/DishTypes/${id}`);
      return response;
    } catch (err) {
      throw err.message;
    }
  };