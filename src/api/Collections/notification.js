import api from "../axiosConfig";
const v1 = "/v1/admin";
export const getNotifications = async () => {
  try {
    const response = await api.get(`/Notifications`);
    return response;
  } catch (err) {
    throw err.message;
  }
};
export const addNotification= async (body) => {
    try {
      const response = await api.post(`/Notifications`,body);
      return response;
    } catch (err) {
      throw err.message;
    }
  };
  export const editNotification= async (props) => {
    try {
      const response = await api.put(`/Notifications/${props._id}`,props.body);
      return response;
    } catch (err) {
      throw err.message;
    }
  };
  export const removeNotification= async (id) => {
    try {
      const response = await api.delete(`/Notifications/${id}`);
      return response;
    } catch (err) {
      throw err.message;
    }
  };