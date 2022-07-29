import { authActions, authReducers } from "./auth";
import { menuActions, menuReducer } from "./menu";
import { formActions, formReducer } from "./form";
import { employeesActions, employeesReducer } from "./employees";
import { dishesActions, dishesReducer } from "./dishes";
import { categoriesActions, categoriesReducer } from "./categories";
import { inventoriesActions, inventoriesReducer } from "./inventories";
// import { newsActions, newsReducer } from "./news";
// import { keyWordActions, keyWordReducer } from "./keyword";
// import { vouchersActions, vouchersReducer } from "./voucher";
// import { brandActions,brandReducer } from "./brand";
const actions = {
  authActions,
  menuActions,
  formActions,
  employeesActions,
  dishesActions,
  categoriesActions,
  inventoriesActions,
  //   newsActions,
  //   keyWordActions,
  //   vouchersActions,
  //   brandActions,
};

const reducers = {
  authReducers,
  menuReducer,
  formReducer,
  employeesReducer,
  dishesReducer,
  categoriesReducer,
  //   productReducer,
  //   bannerReducer,
  inventoriesReducer,
  //   newsReducer,
  //   keyWordReducer,
  //   vouchersReducer,
  //   brandReducer,
};

export { actions, reducers };
