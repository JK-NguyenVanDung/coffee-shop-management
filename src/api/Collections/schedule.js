import api from "../axiosConfig";
const v1 = "/v1/admin";
export const getSchedules = async () => {
  try {
    const response = await api.get(`/Schedules`);
    return response;
  } catch (err) {
    throw err.message;
  }
};
export const addSchedule = async (body) => {
    try {
      const response = await api.post(`/Schedules`,body);
      return response;
    } catch (err) {
      throw err.message;
    }
  };
  export const editSchedule = async (props) => {
    try {
      const response = await api.put(`/Schedules/${props._id}`,props.body);
      return response;
    } catch (err) {
      throw err.message;
    }
  };
  export const removeSchedule = async (id) => {
    try {
      const response = await api.delete(`/Schedules/${id}`);
      return response;
    } catch (err) {
      throw err.message;
    }
  };