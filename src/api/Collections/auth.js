import api from "../axiosConfig";
const v1 = "/v1/admin";
export const login = (body) => {
    try {
        const response =  api.post(`/auth/login`,body);
        return response;
      } catch (err) {

        return err;

      }
}
export const logout = () => {
  try {
      const response =  api.post(`/auth/logout`);
      return response;
    } catch (err) {

      throw err.message;
    }
}
export const getInfo= async() => {
    try {
        const response = await api.get(`/GetInfo`);

        return response;
      } catch (err) {
        throw err.message;
      }
}