import api from "../axiosConfig";
const v1 = "/v1/admin";
export const login = (body) => {
    try {
        console.log(JSON.stringify(body));
        const response =  api.post(`/auth/login`,body);
        return response;
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