import { API_CONFIG } from "../../api";
import axiosConfig from "../axiosConfig";
import { IPageRequest } from "../global";
import { getProperties } from '../collections';
import api from "./axiosConfig";
const v1 = "/v1/admin";

export default {
  getAll: (paramsValue) => {
    return axiosConfig.getProperties(`${API_CONFIG.ADMIN.GET}`, {
      params: paramsValue
    });
  },  
  edit: (id, dataValue) => {
    return axiosConfig.put(`${API_CONFIG.ADMIN.EDIT(id)}`, dataValue);
  },
  create: (dataValue) => {
    return axiosConfig.post(`${API_CONFIG.ADMIN.GET}`, dataValue);
  },
};
