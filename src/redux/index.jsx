import { authActions, authReducers } from "./auth";
import { menuActions, menuReducer } from "./menu";
import { formActions, formReducer } from "./form";
import { employeesActions, employeesReducer } from "./employees";
import { dishesActions, dishesReducer } from "./dishes";
import { categoriesActions, categoriesReducer } from "./categories";
import { billsActions, billsReducer } from "./bills";
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
  billsActions,
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
  billsReducer,
  //   newsReducer,
  //   keyWordReducer,
  //   vouchersReducer,
  //   brandReducer,
};

export { actions, reducers };
