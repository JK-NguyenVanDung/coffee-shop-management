import "./App.css";
import React, { useEffect } from "react";
//import logo from "./logo.svg";
import { useAppDispatch, useAppSelector } from "./hook/useRedux";
import { actions } from "./redux";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login/Login";
import SiderDemo from "./pages/admin";
// import MakeRoutes from "./router/adminRouter";
import MakeRoutes from "./router/pageRouter";
import "antd/lib/style/themes/default.less";
import "antd/dist/antd.less";
import "./App.less";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { colors } from "./helper/Color";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
      dark: colors.secondaryDark,
    },
    success: {
      main: colors.success,
    },
    error: {
      main: colors.error,
    },
    info: {
      main: colors.info,
      dark: colors.infoDark,
    },
  },
});

function App() {
  // const token = useAppSelector((state) => state.auth.token);
  // useEffect(() => {}, [token]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <MakeRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
{
  /* <Route path="/" element={<Login/>} /> */
}

// render={() => {
//   // return token ? <AuthRouter /> : <Navigate to="/" />;
//   return ;
// }}
export default App;
