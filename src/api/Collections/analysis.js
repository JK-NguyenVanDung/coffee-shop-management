import api from "../axiosConfig";
const v1 = "/v1/admin";

  export const getData = async (props) => {
    try {
      const response = await api.post(`/statistics`,props);
      return response;
    } catch (err) {
      throw err.message;
    }
  };
 