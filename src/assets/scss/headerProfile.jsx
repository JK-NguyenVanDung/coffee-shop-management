import { Avatar, Badge, Dropdown, Menu } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hook/useRedux";
import { actions } from "../../redux";
import {
  LoginOutlined,
  EditOutlined,
  BellFilled,
  ProfileFilled,
  SettingOutlined,
} from "@ant-design/icons";
import Bell from "../../assets/img/bell.svg";
import { IconButton } from "@mui/material/";
const test = {
  email: "spottran2001@gmail.com",
  sdt: "03112323123",
  address: "abcasd",
  full_name: "Tran Van A",
  age: 12,
  id_card: "3123213123",
  avatar: "adsad",
  active: true,
  password: "sadasdasd",
  status: 1,
  role: 1,
};
export default function HeaderProFile() {
  // const getProFile = useAppSelector((state) => state.showProfile.data);
  const info = test; //useAppSelector((state) => state.auth.info);
  const getProFile = {
    name: info ? info.full_name : "Admin",
    avatar: info
      ? info.avatar
      : "https://truyenhinh.fpt.vn/wp-content/uploads/52426857_529098130918556_505237438482874368_n.jpg",
  };
  const [show, setShow] = useState(false);
  const history = useNavigate();
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   if (getProFile) {
  //     setShow(true);
  //   }
  // });
  // const logout = () => {
  //   dispatch(actions.authActions.logout());
  // };
  // const routerProfile = () => {
  //   history.replace("/admin/profile");
  // };
  const menu = show ? (
    <Menu>
      <Menu.ItemGroup title={`Hi ${getProFile.name}`}>
        <Menu.Divider />
        {/* <Menu.Item icon={<SettingOutlined />}>Setting</Menu.Item>
                <Menu.Item icon={<ProfileFilled />} onClick={routerProfile}>
                    Profile
                </Menu.Item> */}
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.Item icon={<LoginOutlined />} onClick={() => {}}>
        {" "}
        {/* logout */}
        Logout
      </Menu.Item>
    </Menu>
  ) : (
    ""
  );
  return (
    <div className="right">
      <div className="mr15">
        <Badge dot={true} offset={[-10, 10]}>
          <IconButton style={{ color: "#000" }}>
            <img src={Bell} />
          </IconButton>
        </Badge>
      </div>
      <div>
        <Dropdown overlay={menu} overlayStyle={{ width: "20rem" }}>
          <div className="ant-dropdown-link">
            <Avatar
              src={show ? getProFile.avatar : ""}
              alt="avatar"
              style={{ cursor: "pointer" }}
            />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
