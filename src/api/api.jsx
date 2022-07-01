export const API_URL = "https://";
export const API_CONFIG = {
  AUTH: {
    LOGINADMIN: `/admin/auth/signin`,
    GET_INFO: `/v1/admin/admins/yourself`
  },
  USER: {
    GET: `/v1/admin/users`,
    EDIT: (id) => `/v1/admin/users/${id}`
  },
  ADMIN: {
    GET: `/v1/admin/admins`,
    EDIT: (id) => `/v1/admin/admins/${id}`
  },
  CATEGORY: {
    GET: `/v1/admin/categories`,
    GETDETAIL: (id) => `/v1/admin/categories/${id}/products`,
    EDIT: (id) => `/v1/admin/categories/${id}`,
    DELETE: (id) => `/v1/admin/categories/${id}`,
    CREATE: `/v1/admin/categories`,
    ADD_PRODUCT: (id) => `/v1/admin/link_products/${id}?type=category`,
    REMOVE_PRODUCT: (id) =>
      `/v1/admin/link_products/${id}?type=category`,
    UPDATE_POSITION: (id) => `/v1/admin/categories/${id}/position`
  },


};
