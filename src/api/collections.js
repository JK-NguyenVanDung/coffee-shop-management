import api from "./axiosConfig";

const v1 = "/v1/admin/collections";
const v2 = "/v1/admin";

export const getProperties = async () => {
  try {
    const response = await api.get(`${v1}/properties`);
    return response;
  } catch (err) {
    throw err.message;
  }
};
export const setActive = async (id) => {
  try {
    const response = await api.put(`${v2}/products/${id}/active`);
    return response;
  } catch (err) {
    throw err.message;
  }
};
export const getWarehouses = async () => {
  try {
    const response = await api.get(`${v1}/warehouses`);
    return response;
  } catch (err) {
    throw err.message;
  }
};

export const getBrands = async () => {
  try {
    const response = await api.get(`${v1}/brands`);
    return response;
  } catch (err) {
    throw err.message;
  }
};
export const getBrand = async (id) => {
  try {
    const response = await api.get(`/v1/admin/brands/${id}`);
    return response;
  } catch (err) {
    throw err.message;
  }
};
export const addBrand = async (body) => {
  try {
    const response = await api.post(`/v1/admin/brands`,body);
    return response;
  } catch (err) {
    throw err.message;
  }
};
export const editBrand = async (props) => {
  try {
    const response = await api.put(`/v1/admin/brands/${props.id}`,props.body);
    return response;
  } catch (err) {
    throw err.message;
  }
};
export const removeBrand = async (id) => {
  try {
    const response = await api.delete(`/v1/admin/brands/${id}`);
    return response;
  } catch (err) {
    throw err.message;
  }
};
export const createProperty = async (body) => {
  try {
    const response = await api.post(`${v1}/create_property`, body);
    return response;
  } catch (err) {
    throw err.message;
  }
};
