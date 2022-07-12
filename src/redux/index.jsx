import { authActions, authReducers } from "./auth";
import { menuActions, menuReducer } from "./menu";
import { formActions, formReducer } from "./form";
// import { categoryActions, categoryReducer } from "./category";
// import { productActions, productReducer } from "./product";
// import { bannerActions, bannerReducer } from "./banner";
// import { orderActions, orderReducer } from "./order";
// import { newsActions, newsReducer } from "./news";
// import { keyWordActions, keyWordReducer } from "./keyword";
// import { vouchersActions, vouchersReducer } from "./voucher";
// import { brandActions,brandReducer } from "./brand";
const actions = {
  authActions,
  menuActions,
  formActions,
  //   categoryActions,
  //   productActions,
  //   bannerActions,
  //   orderActions,
  //   newsActions,
  //   keyWordActions,
  //   vouchersActions,
  //   brandActions,
};

const reducers = {
  authReducers,
  menuReducer,
  formReducer,
  //   categoryReducer,
  //   productReducer,
  //   bannerReducer,
  //   orderReducer,
  //   newsReducer,
  //   keyWordReducer,
  //   vouchersReducer,
  //   brandReducer,
};

export { actions, reducers };
