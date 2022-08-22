import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import MyPagination from "../../../components/Pagination";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
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
import * as collections from "../../../api/Collections/notification";
import Loading from "../../../components/Loading";
import { actions } from "../../../redux";

function Notification(props) {
  const [items, setItems] = useState([]);
  const [inputItem, setInputItem] = useState("");
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // const temp = JSON.parse(localStorage.getItem("items"));
    // if (temp && temp.length > 0) {
    //   setItems(temp);
    // }
    fetchData();
  }, [update]);

  // useEffect(() => {
  //   localStorage.setItem("items", JSON.stringify(items));
  // }, [items, update]);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await collections.getNotifications();
      setItems(response);
      setLoading(false);
      // setPagination({
      //   totalDocs: response.metadata.count,
      // });
    } catch (error) {
      //history.replace("/");
    }
  };
  async function addItem() {
    if (inputItem.trim() !== "") {
      setLoading(true);

      let temp = items;
      let current = new Date();
      if (temp !== null) {
        if (temp.length >= 3) {
          await collections.removeNotification(temp[0]._id);
        }
        await collections.addNotification({
          title: inputItem,
          content: inputItem,
        });
      }
      dispatch(actions.menuActions.updateNoti());

      setItems(temp);
      setUpdate(!update);
      setInputItem("");
      setLoading(false);
    }
  }
  async function deleteItem(e) {
    setLoading(true);

    await collections.removeNotification(e._id);
    setUpdate(!update);
    setLoading(false);

    setInputItem("");
  }
  return (
    <>
      {/* TẠO THÔNG BÁO */}

      <div className="notificationCont" {...props}>
        <Loading loading={loading} />

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
                <div key={item._id} className="mainNote">
                  <div className="titleMain">
                    <div className="leftTitle">
                      <div className="title"> {item.title}</div>
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
                    <span>{moment(item.createdAt).format("DD/MM/YYYY")}</span>
                    <br />
                    <span> {moment(item.createdAt).format(" h:mma")}</span>
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
