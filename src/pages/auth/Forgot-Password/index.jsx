// import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import MyPagination from "../../../components/Pagination";
// import { Input } from "antd";
// import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
// import { actions } from "../../../redux";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Form, Input, message, notification, Spin } from "antd";
// import auth from "../../../service/auth/authService";
import Button from "antd-button-color";
import "./Login.scss";
import { LoadingOutlined } from "@ant-design/icons";
import bgImg from "../../../assets/img/coffee-beans.png";
import formBg from "../../../assets/img/coffeeCup.svg";
import formWaves from "../../../assets/img/waves.svg";
import { MailOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import "antd/dist/antd.css";

const { Search } = Input;
// export default function Inventory() {
//   return <></>;
// }
function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  function onFinish() {}

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <div>
      <div className="Home">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <div className="img-cont">
              <div className="bg-cont">
                <img src={bgImg} />
              </div>
            </div>
            <div className="form-cont">
              <div className="form-img"></div>
              <div className="form-waves">
                <img src={formWaves} />
              </div>

              <h1>Quên mật khẩu?</h1>

              <Form
                layout="vertical"
                name="basic"
                initialValues={{
                  remember: true,
                }}
                requiredMark={false}
                onFinish={onFinish}
                size="large"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input
                    className="email"
                    suffix={<MailOutlined />}
                    placeholder="Vui lòng nhập email tài khoản của bạn"
                    type="email"
                    style={{ with: "100%" }}
                  />
                </Form.Item>

                <Form.Item style={{ marginTop: 35 }}>
                  <Spin indicator={antIcon} spinning={loading}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      size="large"
                      style={{
                        background: "#111",
                        width: "50%",
                        justifySelf: "center",
                        border: "none",
                        marginLeft: "25%",
                      }}
                    >
                      Xác nhận
                    </Button>
                  </Spin>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Inventory1() {
  let history = useNavigate();
  const dispatch = useAppDispatch();
  // const token = useAppSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  // if (token) {
  //   history.push("/admin");
  // } else {
  //   history.push("/");
  //   openNotification();
  // }
  // }, []);

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const openNotification = () => {
    const args = {
      message: "Đăng nhập Admin",
      description: "Xin mời đăng nhập",
      duration: 2,
    };
    notification.success(args);
  };
  const onFinish = (values) => {
    const fecthAuth = async () => {
      setLoading(true);
      try {
        // const response = await authService.login(values);
        // dispatch(actions.authActions.Login(response.data.token));
        // localStorage.setItem('Bearer', `Bearer ${response.access_token}`);
        // setToken(response.access_token);
        // dispatch(loginSuccess(token));
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        history.replace("/admin");
        message.success("Đăng nhập thành công");
      } catch (error) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    // fecthAuth();
    // dispatch(actions.authActions.clickAdd('Akkk'));
    // history.replace('/admin')
  };

  return (
    <div>
      <div className="Home">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <h2>Login</h2>

            <Form
              {...layout}
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input type="email" />
              </Form.Item>

              <Form.Item {...tailLayout} size="large">
                <Spin indicator={antIcon} spinning={loading}>
                  <Button type="primary" htmlType="submit" size="large">
                    Login
                  </Button>
                </Spin>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Inventory;
