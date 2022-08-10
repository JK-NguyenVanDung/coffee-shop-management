import api from "../axiosConfig";
const v1 = "/v1/admin";
export const upload = async (file) => {
  try {
    const response = await api.post(`/upload`,file);
    return response;
  } catch (err) {
    // throw err.message;
    console.error(err, err.stack);

  }
};