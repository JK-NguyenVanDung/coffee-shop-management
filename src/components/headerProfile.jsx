import { Avatar, Badge, Dropdown, Menu } from "antd";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hook/useRedux";
import { actions } from "../redux";
import {
  LoginOutlined,
  EditOutlined,
  BellFilled,
  ProfileFilled,
  SettingOutlined,
} from "@ant-design/icons";
import Bell from "../assets/img/bell.svg";
import ActiveBell from "../assets/img/bell_active.svg";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import { IconButton } from "@mui/material/";
import * as collections from "../api/Collections/auth";
import Card from "@mui/material/Card";

import Notification from "./MenuHeader/Notification";
import avatar from "../assets/img/avatar.png";
import { Input, Form } from "antd";

import Button from "@mui/material/Button";

import { CloseOutlined } from "@ant-design/icons";
const { Search } = Input;
const labels = {
  statistic: "Báo cáo thống kê doanh thu",
  activity_summary: "Tóm tắt hoạt động",
  bank_card: "Thẻ ngân hàng của tôi",
  target: "Mục tiêu",
  morning_money: "Tiền sáng",
  lunch_money: "Tiền trưa",
  evening_money: "Tiền tối",
};
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
  const info = useAppSelector((state) => state.auth.info);
  const getProFile = {
    name: info ? info.full_name : "Admin",
    avatar: info && info.avatar ? info.avatar : avatar,
  };
  const [show, setShow] = useState(false);
  const [showNoti, setShowNoti] = useState(false);
  const [showBank, setShowBank] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   if (getProFile) {
  //     setShow(true);
  //   }
  // });
  const token = useAppSelector((state) => state.auth.token);

  const logout = async () => {
    console.log(token);
    const response = await collections.logout(token);
    dispatch(actions.authActions.logout());
    localStorage.removeItem("Bearer");
    navigate(`../`);
  };
  // const routerProfile = () => {
  //   history.replace("/admin/profile");
  // };

  const Bank = () => {
    return (
      <Card sx={{ p: 5, height: "70vh", borderRadius: "12px" }}>
        <div className="modalCont">
          <div className="headerCont" style={{ padding: 0, paddingBottom: 10 }}>
            <h2>Tiền trong két hôm nay</h2>
            <IconButton
              style={{ marginBottom: 10 }}
              onClick={(e) => showBankDropDown(e)}
            >
              <CloseOutlined />
            </IconButton>
          </div>
          <Form className="form" initialValues={{ modifier: "public" }}>
            <div className="bodyCont">
              <div style={{ width: "100%" }}>
                <h4>{labels.morning_money}</h4>
                <Form.Item
                  name=""
                  rules={[
                    {
                      required: true,
                      message: `Không được để trống tiền buổi sáng`,
                    },
                    {
                      pattern: new RegExp(/^\w/),
                      // message: errorText.space,
                    },
                  ]}
                >
                  <Input
                    // disabled={isDetail}
                    dropdownStyle={{ zIndex: 2000 }}
                    placeholder="Nhập tiền buổi trưa"
                  />
                </Form.Item>
                <h4>{labels.lunch_money}</h4>
                <Form.Item
                  name=""
                  rules={[
                    {
                      required: true,
                      message: `Không được để trống tiền buổi trưa`,
                    },
                    {
                      pattern: new RegExp(/^\w/),
                      // message: errorText.space,
                    },
                  ]}
                >
                  <Input
                    // disabled={isDetail}
                    dropdownStyle={{ zIndex: 2000 }}
                    placeholder="Nhập tiền buổi trưa"
                  />
                </Form.Item>
                <h4>{labels.evening_money}</h4>
                <Form.Item
                  name=""
                  rules={[
                    {
                      required: true,
                      message: `Không được để trống tiền buổi tối`,
                    },
                    {
                      pattern: new RegExp(/^\w/),
                      // message: errorText.space,
                    },
                  ]}
                >
                  <Input
                    // disabled={isDetail}
                    dropdownStyle={{ zIndex: 2000 }}
                    placeholder="Nhập tiền buổi tối"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="btnAnalysis">
              <Button
                size="Large"
                color="primary"
                variant="contained"
                style={{
                  paddingLeft: "15%",
                  paddingRight: "15%",
                  paddingTop: "2%",
                  paddingBottom: "2%",
                  color: "#fff",
                }}
                // disabled={loading}
                // onClick={dataItem && isDetail === true ? editItem : handleOk}
              >
                Lưu
              </Button>
            </div>
          </Form>
          {/* <AlertDialog
                            children={`Xác nhận xoá ${dataItem ? dataItem.name : null} ?`}
                            title="Xoá nhóm món"
                            onAccept={handleDelete}
                        /> */}
        </div>
      </Card>
    );
  };

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
  const showBankDropDown = (e) => {
    e.preventDefault();
    setShowBank(!showBank);
  };
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
  const notiBank = true ? (
    <Bank
      onMouseEnter={() => setShowBank(true)}
      onMouseLeave={() => setShowBank(false)}
    />
  ) : (
    ""
  );
  return (
    <div className="right">
      <div className="mr15">
        <Dropdown
          overlay={notiBank}
          overlayStyle={{ width: "25rem", top: "10vh !important" }}
          visible={showBank}
        >
          <div className="ant-dropdown-link">
            <IconButton
              style={{ color: "#000" }}
              onClick={(e) => showBankDropDown(e)}
            >
              <AccountBalanceRoundedIcon
                sx={{ fontSize: 32, color: "#6D7D93" }}
              />
            </IconButton>
          </div>
        </Dropdown>
      </div>
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
              <Avatar src={avatar} alt="avatar" style={{ cursor: "pointer" }} />
            </IconButton>
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
