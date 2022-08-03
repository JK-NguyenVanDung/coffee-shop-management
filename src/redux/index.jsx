import { authActions, authReducers } from "./auth";
import { menuActions, menuReducer } from "./menu";
import { formActions, formReducer } from "./form";
import { employeesActions, employeesReducer } from "./employees";
import { dishesActions, dishesReducer } from "./dishes";
import { categoriesActions, categoriesReducer } from "./categories";
import { billsActions, billsReducer } from "./bills";
import { inventoriesActions, inventoriesReducer } from "./inventories";
import { scheduleActions, scheduleReducer } from "./schedule";
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
  inventoriesActions,
  scheduleActions,
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
  inventoriesReducer,
  scheduleReducer,
  //   keyWordReducer,
  //   vouchersReducer,
  //   brandReducer,
};

export { actions, reducers };
