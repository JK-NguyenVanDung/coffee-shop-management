import { Avatar, Badge, Dropdown, Menu } from "antd";
import { useEffect, useState, useRef } from "react";
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
import ActiveBell from "../../assets/img/bell_active.svg";

import { IconButton } from "@mui/material/";
import * as collections from "../../api/Collections/auth";

import Notification from "../../components/MenuHeader/Notification";

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
  const [showNoti, setShowNoti] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   if (getProFile) {
  //     setShow(true);
  //   }
  // });
  const token = useAppSelector((state) => state.auth.token);

  const logout = () => {
    console.log(token);
    collections.logout(token);
    dispatch(actions.authActions.logout());
    localStorage.removeItem("Bearer");
    navigate(`../`);
  };
  // const routerProfile = () => {
  //   history.replace("/admin/profile");
  // };
  const menu = show ? (
    <Menu style={{ borderRadius: 12 }}>
      <Menu.ItemGroup title={`Hi ${getProFile.name}`}>
        {/* <Menu.Divider />
        <Menu.Item icon={<SettingOutlined />}>Setting</Menu.Item>
                <Menu.Item icon={<ProfileFilled />} onClick={routerProfile}>
                    Profile
                </Menu.Item> */}
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.Item icon={<LoginOutlined />} onClick={logout}>
        {/* logout */}
        Logout
      </Menu.Item>
    </Menu>
  ) : (
    ""
  );

  const showNotification = (e) => {
    e.preventDefault();
    setShowNoti(!showNoti);
  };
  const noti = true ? (
    <Notification
      onMouseEnter={() => setShowNoti(true)}
      onMouseLeave={() => setShowNoti(false)}
    />
  ) : (
    ""
  );
  return (
    <div className="right">
      <div className="mr15">
        <Dropdown
          overlay={noti}
          overlayStyle={{ width: "25rem", top: "10vh !important" }}
          visible={showNoti}
        >
          <div className="ant-dropdown-link">
            <Badge dot={showNoti} offset={[-10, 10]}>
              <IconButton
                style={{ color: "#000" }}
                onClick={(e) => showNotification(e)}
              >
                <img src={showNoti ? ActiveBell : Bell} />
              </IconButton>
            </Badge>
          </div>
        </Dropdown>
      </div>

      <div>
        <Dropdown overlay={menu} overlayStyle={{ width: "20rem" }}>
          <div className="ant-dropdown-link">
            <IconButton onClick={() => setShow(!show)}>
              <Avatar
                src={show ? getProFile.avatar : ""}
                alt="avatar"
                style={{ cursor: "pointer" }}
              />
            </IconButton>
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
