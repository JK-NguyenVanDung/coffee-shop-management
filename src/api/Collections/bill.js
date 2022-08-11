import api from "../axiosConfig";
const v1 = "/v1/admin";
export const getBills = async () => {
  try {
    const response = await api.get(`/bills`);
    return response;
  } catch (err) {
    throw err.message;
  }
};
export const getBill = async (id) => {
  try {
    const response = await api.get(`/bills/${id}`);
    return response;
  } catch (err) {
    throw err.message;
  }
};
export const addBill = async (body) => {
    try {
      const response = await api.post(`/bills`,body);
      return response;
    } catch (err) {
      throw err.message;
    }
  };
  export const editBill = async (props) => {
    try {
      const response = await api.put(`/bills/${props._id}`,props.body);
      return response;
    } catch (err) {
      throw err.message;
    }
  };
  export const removeBill = async (id) => {
    try {
      const response = await api.delete(`/bills/${id}`);
      return response;
    } catch (err) {
      throw err.message;
    }
  };
  export const removeThreeMonthBill = async () => {
    try {
      const response = await api.delete(`/bills/`);
      return response;
    } catch (err) {
      throw err.message;
    }
  };