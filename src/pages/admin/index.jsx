import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material/";

import logo from "../../../src/assets/img/logo.svg";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  BookFilled,
  InfoCircleOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { IconButton } from "@mui/material/";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import React from "react";
import HeaderProFile from "../../components/headerProfile";
import { MENU } from "./navMenu";
import "./index.scss";
//import admin from "../../../../api/Collections/admin";

import { useAppDispatch, useAppSelector } from "../../hook/useRedux";
import { actions } from "../../redux";
const { SubMenu } = Menu;
// export default function SiderDemo({ children }) {
//   return(<div>a</div>)
// }
export default function SiderDemos({ children, headerItem = null }) {
  const navigate = useNavigate();
  const location = useLocation();
  const menu = MENU;

  const nameMenu = useAppSelector((state) =>
    state.form.nameMenu ? state.form.nameMenu : "Menu"
  );
  useEffect(() => {
    for (let i = 0; i < menu.length; i++) {
      if (location.pathname === menu[i].path) {
        dispatch(actions.formActions.setNameMenu(menu[i].title));
        break;
      }
    }
  }, []);
  const dispatch = useAppDispatch();
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [role, setRole] = useState(0);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  function goBack() {
    dispatch(actions.formActions.setNameMenu(`Menu`));

    navigate(`../menu`);
  }
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width="250"
        style={{ backgroundColor: "#fff" }}
      >
        <div className="logo">
          <img src={logo} alt="" className="img-responsive" />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ border: "none" }}
          selectedKeys={[location.pathname]}
        >
          <div className="centerCont">
            {collapsed ? (
              <ChevronRightRoundedIcon
                className="trigger"
                onClick={() => toggle()}
              />
            ) : (
              <ChevronLeftRoundedIcon
                className="trigger"
                onClick={() => toggle()}
              />
            )}
          </div>
          {menu.map((item) => {
            return (
              <>
                {item.children.length <= 0 && (
                  <Menu.Item
                    key={item.path}
                    icon={<item.icon fontSize="large" />}
                    onClick={() => {
                      navigate(`${item.path}`);
                      dispatch(actions.formActions.setNameMenu(item.title));
                    }}
                    disabled={item.value == 0} //role &
                  >
                    {item.title}
                  </Menu.Item>
                )}
                {item.children.length > 0 && (
                  <SubMenu
                    title={item.title}
                    key={item.id}
                    icon={<item.icon />}
                    // disabled={(role & item.value) == 0}
                  >
                    {item.children.map((children) => {
                      return (
                        <Menu.Item
                          key={children.id}
                          onClick={() => {
                            // history.push(`${children.path}`);
                            // dispatch(
                            //   actions.formActions.setNameMenu(children.title)
                            // );
                          }}
                        >
                          {children.title}
                        </Menu.Item>
                      );
                    })}
                  </SubMenu>
                )}
              </>
            );
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background header"
          style={{ padding: 0 }}
        >
          {nameMenu && (
            <>
              {location.pathname === "/menu/search" ? (
                <IconButton
                  style={{ marginLeft: 40, width: 60 }}
                  onClick={() =>
                    location.pathname === "/menu/search" ? goBack() : {}
                  }
                >
                  <ArrowBackIcon />
                </IconButton>
              ) : null}
              <h4
                style={{
                  cursor: "pointer",
                  fontSize: 35,
                  paddingLeft: 20,
                  width: location.pathname === "/menu" ? "5rem" : "100%",
                  height: "10rem",
                  whiteSpace: location.pathname === "/menu" ? null : "nowrap",
                  overflow: location.pathname === "/menu" ? null : "hidden",
                  textOverflow:
                    location.pathname === "/menu" ? null : "ellipsis",
                }}
              >
                {nameMenu}
              </h4>
            </>
          )}

          {headerItem}
          <HeaderProFile />
        </Header>
        <Content className="site-layout-background">{children}</Content>
      </Layout>
    </Layout>
  );
}
