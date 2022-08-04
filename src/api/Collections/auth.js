import api from "../axiosConfig";
const v1 = "/v1/admin";
export const login = (body) => {
    try {
        const response =  api.post(`/auth/login`,body);
        return response;
      } catch (err) {
        console.log(err)

        throw err.message;
      }
}
export const logout = (token) => {
  try {
      api.post(`/auth/logout`,token);
    } catch (err) {
      console.log(err)

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