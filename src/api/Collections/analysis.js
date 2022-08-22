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
  export const getStat = async (props) => {
    try {
      const response = await api.post(`/statistics/totalStatistics`,props);
      return response;
    } catch (err) {
      throw err.message;
    }
  };