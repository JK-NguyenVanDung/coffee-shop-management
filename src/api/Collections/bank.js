import api from "../axiosConfig";
const v1 = "/v1/admin";
export const getBanks = async () => {
  try {
    const response = await api.get(`/banks`);
    console.log(response);

    return response;
  } catch (e) {
    console.log(e);
    throw e.message;
  }
};
export const addBank = async (body) => {
    try {
      const response = await api.post(`/banks`,body);
      return response;
    } catch (err) {
      throw err.message;
    }
  };
  export const editBank = async (props) => {
    try {
      const response = await api.put(`/banks/${props._id}`,props.body);
      return response;
    } catch (err) {
      throw err.message;
    }
  };
  export const removeBank = async (id) => {
    try {
      const response = await api.delete(`/banks/${id}`);
      return response;
    } catch (err) {
      throw err.message;
    }
  };