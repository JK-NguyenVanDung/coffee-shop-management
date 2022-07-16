export const API_URL = "https://linhcoffeebe.herokuapp.com";
export const API_CONFIG = {
  AUTH: {
    LOGINADMIN: `/admin/auth/signin`,
    GET_INFO: `/admins/yourself`,
  },
  ACCOUNTS: {
    GET: `/accounts`,
    EDIT: (id) => `/accounts/${id}`,
    DELETE: (id) => `/accounts/${id}`,
  },
  ADMIN: {
    GET: `/admins`,
    EDIT: (id) => `/admins/${id}`,
  },
  CATEGORY: {
    GET: `/categories`,
    GETDETAIL: (id) => `/categories/${id}/products`,
    EDIT: (id) => `/categories/${id}`,
    DELETE: (id) => `/categories/${id}`,
    CREATE: `/categories`,
    ADD_PRODUCT: (id) => `/link_products/${id}?type=category`,
    REMOVE_PRODUCT: (id) => `/link_products/${id}?type=category`,
    UPDATE_POSITION: (id) => `/categories/${id}/position`,
  },
};
