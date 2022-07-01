import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  LineChartOutlined
} from "@ant-design/icons";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import React from "react";
import HeaderProFile from "../../assets/scss/headerProfile";
import { MENU } from "./navMenu";
import "./index.scss"
//import admin from "../../../../api/Collections/admin";

import { useAppDispatch, useAppSelector } from "../../hook/useRedux";
import { actions } from "../../redux";
const { SubMenu } = Menu;
// export default function SiderDemo({ children }) {
//   return(<div>a</div>)
// }
export default function SiderDemos({ children, headerItem = null }) {
  const navigate = useNavigate();

  const nameMenu = useAppSelector((state) => state.form.nameMenu ? state.form.nameMenu : "Menu");
  const dispatch = useAppDispatch();
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [role, setRole] = useState(0);
  const menu = MENU;
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout> 
      <Sider trigger={null} collapsible collapsed={collapsed} width="250"  style={{backgroundColor: "#fff"}}>
        <div className="logo">
          <img src={logo} alt="" className="img-responsive" />
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}     style={{border:"none"}}>
        <div className="centerCont">
            {collapsed? <ChevronRightRoundedIcon className= "trigger" onClick={()=>toggle()}/> : <ChevronLeftRoundedIcon className= "trigger" onClick={()=>toggle()}/>}
          </div>
          {menu.map((item) => {
            return (
              <>
                {item.children.length <= 0 && (
                  <Menu.Item
                    key={item.id}
                    icon={<item.icon />}
                    onClick={() => {
                      navigate(`${item.path}`);
                      dispatch(actions.formActions.setNameMenu(item.title));
                    }}
                    disabled={( item.value) == 0} //role &
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
  
          {nameMenu && <h4 style={{ fontSize: 35, paddingLeft: 20  }}>{nameMenu}</h4>}
          {headerItem}
          <HeaderProFile />
        </Header>
        <Content className="site-layout-background">{children}</Content>
      </Layout>
    </Layout>
  );
}
//  function SiderDemo1({ children }) {
//   const history = useNavigate();
//   const nameMenu = useAppSelector((state) => state.form.nameMenu);
//   const dispatch = useAppDispatch();
//   const { Header, Sider, Content } = Layout;
//   const [collapsed, setCollapsed] = useState(false);
//   const [exercises, setExercises] = useState([]);
//   const [role, setRole] = useState(0);
//   const menu = MENU;
//   const toggle = () => {
//     setCollapsed(!collapsed);
//   };
//   // useEffect(() => {
//   //   (async () => {
//   //     // const data = await api.getAll();
//   //     // setExercises([...data.filter((item) => item.name !== 'Test cuối khoá')]);
//   //   })();
//   // }, [nameMenu]);
//   // useEffect(() => {
//   //   const fecthUserProfile = async () => {
//   //     try {
//   //       // const { data } = await adminAPI.getInfo();
//   //       // dispatch(actions.authActions.setInfo(data));
//   //       // setRole(data.role);
//   //     } catch (error) {
//   //       if (error.response.status === 401) {
//   //         // dispatch(actions.authActions.logout());
//   //       }
//   //     }
//   //   };
//   //   setTimeout(() => {
//   //     fecthUserProfile();
//   //   }, 1000);
//   // }, []);
//   return (
//     <Layout>
//       <Sider trigger={null} collapsible collapsed={collapsed} width="250">
//         <div className="logo">
//           <img src={logo} alt="" className="img-responsive" />
//         </div>
//         <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
//           {menu.map((item) => {
//             return (
//               <>
//                 {item.children.length <= 0 && (
//                   <Menu.Item
//                     key={item.id}
//                     icon={<item.icon />}
//                     onClick={() => {
//                       history.push(`${item.path}`);
//                       dispatch(actions.formActions.setNameMenu(item.title));
//                     }}
//                     disabled={(role & item.value) == 0}
//                   >
//                     {item.title}
//                   </Menu.Item>
//                 )}
//                 {item.children.length > 0 && (
//                   <SubMenu
//                     title={item.title}
//                     key={item.id}
//                     icon={<item.icon />}
//                     disabled={(role & item.value) == 0}
//                   >
//                     {item.children.map((children) => {
//                       return (
//                         <Menu.Item
//                           key={children.id}
//                           onClick={() => {
//                             history.push(`${children.path}`);
//                             dispatch(
//                               actions.formActions.setNameMenu(children.title)
//                             );
//                           }}
//                         >
//                           {children.title}
//                         </Menu.Item>
//                       );
//                     })}
//                   </SubMenu>
//                 )}
//               </>
//             );
//           })}
//         </Menu>
//       </Sider>
//       <Layout className="site-layout">
//         <Header
//           className="site-layout-background header"
//           style={{ padding: 0 }}
//         >
//           <div className="left">
//             {React.createElement(
//               collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
//               {
//                 className: "trigger",
//                 onClick: toggle
//               }
//             )}
//           </div>
//           {nameMenu && <h3 style={{ fontSize: 25 }}>{nameMenu}</h3>}
//           <HeaderProFile />
//         </Header>
//         <Content className="site-layout-background">{children}</Content>
//       </Layout>
//     </Layout>
//   );
// }
