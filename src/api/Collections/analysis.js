import api from "../axiosConfig";
const v1 = "/v1/admin";

  export const getData = async (props) => {
    try {
      const response = await api.put(`/statistics`,props.body);
      return response;
    } catch (err) {
      throw err.message;
    }
  };
 