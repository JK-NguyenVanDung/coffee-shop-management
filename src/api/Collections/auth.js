import api from "./axiosConfig";
const v1 = "/v1/admin";
export const login = (params) => {

    return axiosConfig.post(API_CONFIG.AUTH.LOGINADMIN, params)
}
export const getInfo= () => {
    return axiosConfig.get(`${API_CONFIG.AUTH.GET_INFO}`);
}