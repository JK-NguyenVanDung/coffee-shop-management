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
};
