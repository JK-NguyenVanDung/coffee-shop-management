import { Route, Routes } from "react-router";
import Menu from "../pages/Menu";
import Analysis from "../pages/admin/Analysis";
import Bills from "../pages/admin/Bills";
import Employees from "../pages/admin/Employees";
import Food_and_drink from "../pages/admin/Food-and-drink";
import Category from "../pages/admin/Category";
import Schedule from "../pages/admin/Schedule";
import Inventory from "../pages/admin/Inventory";
import Search from "../pages/Menu/MenuComponents/Search";
import SiderDemo from "../pages/admin";
import MenuHeader from "../components/MenuHeader/MenuHeader";
import Login from "../pages/auth/Login/Login";
import { useAppDispatch, useAppSelector } from "../hook/useRedux";
import { Navigate } from "react-router-dom";

export const AdminRouter = {
  // ADMIN: {
  //   path: "/admin",
  // },
  MENU: {
    path: "/menu",
  },
  ANALYSIS: {
    path: "/analysis",
  },
  BILLS: {
    path: "/bills",
  },
  EMPLOYEES: {
    path: "/employees",
  },
  FOOD_AND_DRINK: {
    path: "/food-and-drink",
  },
  INVENTORY: {
    path: "/inventory",
  },
  SEARCH: {
    path: "/menu/search",
  },
  CATEGORY: {
    path: "/category",
  },
  SCHEDULE: {
    path: "/schedule",
  },
};

const routes = [
  {
    path: AdminRouter.MENU.path,
    exact: false,
    headerItem: <MenuHeader switch={true} />,
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
  },
  {
    path: AdminRouter.EMPLOYEES.path,
    exact: false,
    headerItem: null,
    element: <Employees />,
  },
  {
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
  },
  {
    path: AdminRouter.CATEGORY.path,
    exact: false,
    headerItem: null,
    element: <Category />,
  },
  {
    path: AdminRouter.SEARCH.path,
    exact: false,
    headerItem: <MenuHeader switch={false} />,
    element: <Search />,
  },
  {
    path: AdminRouter.SCHEDULE.path,
    exact: false,
    headerItem: null,
    element: <Schedule />,
  },
];

const MakeRoutes = () => {
  const token = useAppSelector((state) => state.auth.token);

  return (
    <Routes>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            exact={route.exact}
            path={route.path}
            element={
              token ? (
                <SiderDemo headerItem={route.headerItem}>
                  {route.element}
                </SiderDemo>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        );
      })}
      {/* <Route
          path="/admin"
          render={() => {
            return token ? <AuthRouter /> : <Redirect to="/" />;
          }}
        /> */}
      <Route path="*" element={<Login />} />

      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default MakeRoutes;
