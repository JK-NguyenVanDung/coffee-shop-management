import { Avatar, Badge, Dropdown, Menu, message, InputNumber } from "antd";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { numbToCurrency } from "../helper/currency";
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
import * as bankCollections from "../api/Collections/bank";
import * as notiCollections from "../api/Collections/notification";

import Card from "@mui/material/Card";
import AlertDialog from "./AlertDialog";
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
  morning_money: "Tiền ca 1 (VND)",
  lunch_money: "Tiền ca 2 (VND)",
  evening_money: "Tiền ca 3 (VND)",
  end_money: "Tổng tiền trong ngày (VND)",
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
  const location = useLocation();
  const notification = useAppSelector((state) => state.menu.noti);

  // const getProFile = useAppSelector((state) => state.showProfile.data);
  const info = useAppSelector((state) => state.auth.info);
  const getProFile = {
    name: info ? info.full_name : "Admin",
    avatar: info.avatar,
  };
  const [show, setShow] = useState(false);
  const [showNoti, setShowNoti] = useState(false);
  const [showBank, setShowBank] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [newNotification, setNewNotification] = useState(false);
  // useEffect(() => {
  //   if (getProFile) {
  //     setShow(true);
  //   }
  // });
  const checkNewNotification = async () => {
    const temp = await notiCollections.getNotifications();

    if (temp && temp.length > 0) {
      setNewNotification(true);
    } else {
      setNewNotification(false);
    }
  };
  useEffect(() => {
    checkNewNotification();
  }, []);
  useEffect(() => {
    checkNewNotification();
  }, [notification]);
  const token = useAppSelector((state) => state.auth.token);

  const logout = async () => {
    console.log(token);
    // const response = await collections.logout(token);
    dispatch(actions.authActions.logout());
    localStorage.removeItem("Bearer");
    navigate(`../`);
  };
  // const routerProfile = () => {
  //   history.replace("/admin/profile");
  // };

  const Bank = (props) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [dataItem, setDataItem] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [final, setFinal] = useState(0);
    const fetchData = async (value) => {
      try {
        setLoading(true);
        const response = await bankCollections.getBanks();
        const today = new Date();
        for (let i = 0; i < response.length; i++) {
          let temp = new Date(response[i].createdAt);

          if (today.getDate() === temp.getDate()) {
            setDataItem(response[i]);
            break;
          } else {
            setDataItem(null);
          }
        }
        console.log(dataItem);
        // setDataItem(response);
        // setPagination({
        //   totalDocs: response.metadata.count,
        // });
      } catch (error) {
        //history.replace("/");
      }
      setLoading(false);
    };

    useEffect(() => {
      // test.current = 2;
      fetchData();
    }, []);

    useEffect(() => {
      form.resetFields();

      const setForm = () => {
        console.log(dataItem);
        form.setFieldsValue({
          //truyền data khi bấm vào => dataItem.
          id: dataItem !== null ? dataItem._id : null,
          // createdAt: moment(new Date(dataItem.createdAt)).format(
          //   "h:mma - DD/MM/YYYY"
          // ),
          morning: dataItem !== null ? dataItem.morning : 0,
          afternoon: dataItem !== null ? dataItem.afternoon : 0,
          night: dataItem !== null ? dataItem.night : 0,
          proceeds: dataItem !== null ? dataItem.proceeds : 0,
          status: dataItem !== null ? dataItem.status : false,
        });
      };

      if (dataItem) {
        setForm();
      }
    }, [dataItem]);
    const handleOk = async (confirm) => {
      form
        .validateFields()
        .then(async (values) => {
          setLoading(true);
          const temp = [];
          if (dataItem) {
            await bankCollections.editBank({
              _id: dataItem._id,
              body: {
                morning: values.morning,
                afternoon: values.afternoon,
                night: values.night,
                proceeds: values.proceeds,
                status: !confirm,
              },
            });
            setShowBank(false);
            message.success("Thay đổi thành công");
            setLoading(false);
          } else {
            await bankCollections.addBank({
              morning: values.morning,
              afternoon: values.afternoon,
              night: values.night,
              proceeds: values.proceeds,
            });
            setShowBank(false);
            message.success("Lưu thành công");

            setLoading(false);
          }
        })

        .catch((info) => {
          dispatch(actions.formActions.showError());

          setLoading(false);
        });
      dispatch(actions.formActions.hideDelete());
    };
    const deleteItem = () => {
      dispatch(actions.formActions.showDelete());
    };
    return (
      <Card
        sx={[
          {
            p: 5,
            height: "80vh",
            borderRadius: "12px",
            width: "100%",
          },
          loading
            ? {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }
            : null,
        ]}
        {...props}
      >
        {!loading ? (
          <div className="modalCont" style={{ overflow: "hidden" }}>
            <AlertDialog
              children={`Tổng số tiền ${numbToCurrency(final)} ngày ${new Date(
                dataItem && dataItem.createdAt
              ).toLocaleDateString("vi-VN")} ?`}
              title="Chốt số tiền hôm nay"
              onAccept={() => handleOk(true)}
            />
            <div
              className="headerCont"
              style={{ padding: 0, paddingBottom: 10 }}
            >
              <h2>Tiền trong két hôm nay</h2>
              <IconButton
                style={{ marginBottom: 10 }}
                onClick={(e) => showBankDropDown(e)}
              >
                <CloseOutlined />
              </IconButton>
            </div>
            <Form
              form={form}
              className="form"
              initialValues={{
                morning: 0,
                afternoon: 0,
                night: 0,
                proceeds: 0,
              }}
            >
              <div className="bodyCont">
                <div style={{ width: "100%" }}>
                  <h4>{labels.morning_money}</h4>
                  <Form.Item
                    name="morning"
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
                    <InputNumber
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      min={0}
                      max={1000000000000}
                      disabled={dataItem ? dataItem.status : false}
                      placeholder="Nhập tiền buổi trưa"
                    />
                  </Form.Item>
                  <h4>{labels.lunch_money}</h4>
                  <Form.Item
                    name="afternoon"
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
                    <InputNumber
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      min={0}
                      max={1000000000000}
                      disabled={dataItem ? dataItem.status : false}
                      placeholder="Nhập tiền buổi trưa"
                    />
                  </Form.Item>
                  <h4>{labels.evening_money}</h4>
                  <Form.Item
                    name="night"
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
                    <InputNumber
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      min={0}
                      max={1000000000000}
                      disabled={dataItem ? dataItem.status : false}
                      placeholder="Nhập tiền buổi tối"
                    />
                  </Form.Item>
                  <h4>{labels.end_money}</h4>
                  <Form.Item
                    name="proceeds"
                    rules={[
                      {
                        required: true,
                        message: `Không được để trống tiền cuối ngày`,
                      },
                      {
                        pattern: new RegExp(/^\w/),
                        // message: errorText.space,
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      min={0}
                      max={1000000000000}
                      disabled={dataItem ? dataItem.status : false}
                      placeholder="Nhập tiền cuối ngày"
                      onChange={(e) => setFinal(e)}
                    />
                  </Form.Item>
                </div>
              </div>
              <div
                className="btnAnalysis"
                style={{ display: "flex", flexDirection: "column" }}
              >
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
                    marginBottom: "2vh",
                  }}
                  disabled={(dataItem ? dataItem.status : false) || loading}
                  onClick={() => handleOk(false)}
                >
                  Lưu
                </Button>
                {dataItem ? (
                  <Button
                    disabled={(dataItem ? dataItem.status : false) || loading}
                    size="Large"
                    color="success"
                    variant="contained"
                    style={{
                      paddingLeft: "15%",
                      paddingRight: "15%",
                      paddingTop: "2%",
                      paddingBottom: "2%",
                      color: "#fff",
                    }}
                    onClick={() => deleteItem()}
                  >
                    {`Chốt đơn ngày ${new Date(
                      dataItem.createdAt
                    ).toLocaleDateString("vi-VN")}`}
                  </Button>
                ) : null}
              </div>
            </Form>
            {/* <AlertDialog
                            children={`Xác nhận xoá ${dataItem ? dataItem.name : null} ?`}
                            title="Xoá nhóm món"
                            onAccept={handleDelete}
                        /> */}
          </div>
        ) : (
          <div>
            <CircularProgress />
          </div>
        )}
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
        Đăng xuất
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
      {(location.pathname === "/menu" || location.pathname === "/analysis") && (
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
                  sx={{ fontSize: 32, color: showBank ? "#92CAD1" : "#6D7D93" }}
                />
              </IconButton>
            </div>
          </Dropdown>
        </div>
      )}
      <div className="mr15">
        <Dropdown
          overlay={noti}
          overlayStyle={{ width: "25rem", top: "10vh !important" }}
          visible={showNoti}
        >
          <div className="ant-dropdown-link">
            <Badge dot={newNotification} offset={[-10, 10]}>
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
                src={getProFile.avatar}
                alt="avatar"
                icon={<UserOutlined />}
                fall
                style={{ cursor: "pointer" }}
              />
            </IconButton>
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
