import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import MyPagination from "../../../components/Pagination";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
// import { actions } from "../../../redux";
import "./index.scss";
import { Button, Form, Space, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { CloseCircleOutlined } from "@ant-design/icons";
import "antd/lib/style/themes/default.less";
import "antd/dist/antd.less";

function Notification() {
  const [items, setItems] = useState([]);
  const [inputItem, setInputItem] = useState([]);
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  function addItem() {
    setItems(items.push(inputItem));
  }
  return (
    <>
      {/* TẠO THÔNG BÁO */}
      <div class="notificationCont">
        <div class="inputCont">
          <div class="titleNote">
            <h2>TẠO THÔNG BÁO MỚI</h2>
            <CloseOutlined />
          </div>
          <Input
            value={inputItem}
            onChange={(e) => setInputItem(e.target.value)}
            placeholder="Nội dung thông báo"
          />
          <div class="createNote">
            <Button type="primary" onClick={addItem}>
              Tạo thông báo
            </Button>
          </div>
        </div>
        <div class="mainNote">
          <div class="titleMain">
            <CloseCircleOutlined />
            <h3>Hết sữa rồi nhé</h3>
            <CloseOutlined />
          </div>
          <div class="timeCont">
            <h5>Today</h5>
            <h5>10:30PM</h5>
          </div>
        </div>
      </div>

      {/* XÓA THÔNG BÁO */}
      <form class="notificationErase">
        <form class="contentErase">
          <Form.Item>
            <h2>XÓA THÔNG BÁO</h2>
            <div class="contentImpor">
              <CloseCircleOutlined />
              <h4>Hết sữa rồi nhé</h4>
            </div>
            <Space class="buttonErase">
              <Button type="primary" htmlType="submit">
                Xóa
              </Button>
              <Button htmlType="button">Hủy</Button>
            </Space>
          </Form.Item>
        </form>
      </form>
    </>
  );
}

export default Notification;
