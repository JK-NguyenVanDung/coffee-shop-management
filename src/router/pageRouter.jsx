import { Route, Routes } from "react-router";
import Menu from "../pages/Menu";
import Analysis from "../pages/admin/Analysis";
import Bills from "../pages/admin/Bills";
import Employees from "../pages/admin/Employees";
import Food_and_drink from "../pages/admin/Food-and-drink";
import Category from "../pages/admin/Category";
// import KeyData from "../pages/admin/Keyword";
import Inventory from "../pages/admin/Inventory";
import Recipes from "../pages/admin/Recipes";
import SiderDemo from "../pages/admin";
import MenuHeader from "../components/MenuHeader/MenuHeader"

export const AdminRouter = {
  // ADMIN: {
  //   path: "/admin",
  // },
  MENU: {
    path: "/menu"
  },
  ANALYSIS: {
    path: "/analysis"
  },
  BILLS: {
    path: "/bills"
  },
  EMPLOYEES: {
    path: "/employees"
  },
  FOOD_AND_DRINK: {
    path: "/food-and-drink"
  },
  INVENTORY: {
    path: "/inventory"
  },
  RECIPES: {
    path: "/recipes"
  },
  CATEGORY: {
    path: "/category"
  },
};


const routes = [
  {
    path: AdminRouter.MENU.path,
    exact: false,
    headerItem: <MenuHeader/>,
    element: <Menu />,
  },
  {
    path: AdminRouter.ANALYSIS.path,
    exact: false,
    headerItem: null,
    element: <Analysis />,
  },
  {
    path: AdminRouter.BILLS.path,
    exact: false,
    headerItem: null,
    element: <Bills />,
  }, {
    path: AdminRouter.EMPLOYEES.path,
    exact: false,
    headerItem: null,
    element: <Employees />,
  }, {
    path: AdminRouter.FOOD_AND_DRINK.path,
    exact: false,
    headerItem: null,
    element: <Food_and_drink />,
  },
  {
    path: AdminRouter.INVENTORY.path,
    exact: false,
    headerItem: null,
    element: <Inventory />,
  }, {
    path: AdminRouter.RECIPES.path,
    exact: false,
    headerItem: null,
    element: <Recipes />,
  }, {
    path: AdminRouter.CATEGORY.path,
    exact: false,
    headerItem: null,
    element: <Category />,
  },
];

const MakeRoutes = () => {
  return (
    <Routes>

      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            exact={route.exact}
            path={route.path}
            element={<SiderDemo headerItem={route.headerItem}>
              {route.element}
            </SiderDemo>}
          />
        );
      })}    </Routes>

  );
};

export default MakeRoutes;
