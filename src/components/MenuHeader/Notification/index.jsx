import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import MyPagination from "../../../components/Pagination";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
// import { actions } from "../../../redux";
import "./index.scss";
import { Form, Space, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { CloseCircleOutlined } from "@ant-design/icons";
import "antd/lib/style/themes/default.less";
import "antd/dist/antd.less";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import moment from "moment";

function Notification(props) {
  const [items, setItems] = useState([]);
  const [inputItem, setInputItem] = useState("");
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("items"));
    if (temp && temp.length > 0) {
      temp.reverse();
      setItems(temp);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items, update]);

  function addItem() {
    if (inputItem.trim() !== "") {
      let temp = items;
      let current = new Date();
      const obj = { name: inputItem, time: current.toString() };
      if (temp !== null) {
        if (temp.length >= 3) {
          temp[0] = obj;
        } else {
          temp.push(obj);
        }
      }
      setItems(temp);

      // localStorage.setItem("items", JSON.stringify(items));

      setUpdate(!update);
      setInputItem("");
    }
  }
  function deleteItem(e) {
    const result = items.filter((item) => item.time !== e.time);
    setItems(result);
    setUpdate(!update);
  }
  return (
    <>
      {/* TẠO THÔNG BÁO */}
      <div className="notificationCont" {...props}>
        <div className="inputCont">
          <div className="titleNote">
            <h3>TẠO THÔNG BÁO MỚI</h3>
          </div>

          <TextField
            sx={{ textarea: { color: "#fff" } }}
            multiline
            maxRows={6}
            variant="standard"
            value={inputItem}
            onChange={(e) => setInputItem(e.target.value)}
            placeholder="Nội dung thông báo"
          />

          <div className="createNote">
            <Button
              color="success"
              size="large"
              variant="contained"
              onClick={addItem}
              sx={{ color: "#fff" }}
              disabled={inputItem.trim() === ""}
            >
              Tạo thông báo
            </Button>
          </div>
        </div>
        {items.length > 0
          ? items.map((item) => {
              return (
                <div key={item.name} className="mainNote">
                  <div className="titleMain">
                    <div className="leftTitle">
                      <CloseCircleOutlined />
                      <div className="title"> {item.name}</div>
                    </div>
                    <IconButton
                      color="info"
                      size="small"
                      onClick={() => deleteItem(item)}
                    >
                      <CloseOutlined />
                    </IconButton>
                  </div>
                  <div className="timeCont">
                    <span>{moment(item.time).format("DD/MM/YYYY")}</span>
                    <br />
                    <span> {moment(item.time).format(" h:mma")}</span>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      {/* XÓA THÔNG BÁO
      <form className="notificationErase">
        <form className="contentErase">
          <Form.Item>
            <h2>XÓA THÔNG BÁO</h2>
            <div className="contentImpor">
              <CloseCircleOutlined />
              <h4>Hết sữa rồi nhé</h4>
            </div>
            <Space className="buttonErase">
              <Button type="primary" htmlType="submit">
                Xóa
              </Button>
              <Button htmlType="button">Hủy</Button>
            </Space>
          </Form.Item>
        </form>
      </form> */}
    </>
  );
}

export default Notification;
