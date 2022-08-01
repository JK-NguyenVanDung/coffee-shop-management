import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import MyPagination from "../../../components/Pagination";
import { Input, Table, Form, Popconfirm, Upload, message, Tooltip } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
// import { actions } from "../../../redux";
import "./index.scss";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ConstructionIcon from "@mui/icons-material/Construction";
import { CloseOutlined } from "@ant-design/icons";

import { IconButton, Typography } from "@mui/material";
import * as collections from "../../../api/Collections/bill";

import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";

import { errorText } from "../../../helper/Text";
import ImgCrop from "antd-img-crop";

import NumberInput from "../../../components/FormElements/NumberInput";
import moment from "moment";

import AlertModal from "../../../components/FormElements/AlertModal";
import AlertDialog from "../../../components/AlertDialog";

import { numbToCurrency } from "../../../helper/currency";

const radioBtnstyles = (theme) => ({
  radio: {
    "&$checked": {
      color: "#4B8DF8",
    },
  },
  checked: {},
});

const ModalContent = () => {
  const [loading, setLoading] = useState(false);
  const dataItem = useAppSelector((state) => state.bills.detail);
  const [date, setDate] = React.useState(new Date("2001-08-18"));
  const [status, setStatus] = React.useState("1");
  let [role, setRole] = useState(true);
  const loadData = useAppSelector((state) => state.form.loadData);
  const modalError = useAppSelector((state) => state.form.modalError);
  const isDetail = useAppSelector((state) => state.form.detail);
  const [disablePass, setDisablePass] = useState(true);
  const openDialog = useAppSelector((state) => state.form.delete);

  const [details, setDetails] = useState([]);
  const handleChange = (newValue) => {
    setDate(newValue);
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handlePrint = () => dispatch(actions.formActions.showForm());
  const handleClose = () => dispatch(actions.formActions.closeForm());

  const deleteItem = () => {
    dispatch(actions.formActions.showDelete());
  };
  const editItem = () => dispatch(actions.formActions.setDetail(false));
  function getPayment(item) {
    let role = "";
    switch (item) {
      case 0:
        role = "Tiền mặt";
        break;
      case 1:
        role = "Momo";
        break;
      case 2:
        role = "Ngân hàng";
        break;
      default:
        role = "Tiền mặt";
        break;
    }
    return role;
  }
  useEffect(() => {
    form.resetFields();
    const setForm = () => {
      form.setFieldsValue({
        //truyền data khi bấm vào => dataItem.
        id: dataItem._id,
        createdAt: moment(new Date(dataItem.createdAt)).format(
          "h:mma - DD/MM/YYYY"
        ),
        price_total: numbToCurrency(dataItem.price_total),
        account_id: dataItem.account_id,
        payment_type: getPayment(dataItem.payment_type),
        vat: 0,
      });
      setDetails(dataItem.details);
    };

    if (dataItem) {
      setForm();
    }
  }, [dataItem]);
  const { Bill, manager } = role;
  const error = [Bill, manager].filter((v) => v).length !== 1;

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        const temp = [];
        if (dataItem) {
          await collections.editBill({
            _id: dataItem._id,
            body: {},
          });
          handleClose();
          dispatch(actions.formActions.changeLoad(!loadData));
          message.success("Thay đổi thành công");

          setLoading(false);
        } else {
          await collections.addBill({
            name: values.name,
          });
          handleClose();
          dispatch(actions.formActions.changeLoad(!loadData));
          message.success("Thêm thành công");

          setLoading(false);
        }
      })

      .catch((info) => {
        dispatch(actions.formActions.showError());

        setLoading(false);
      });
  };

  function getHeaderTitle() {
    return "Chi tiết đơn hàng";
  }
  const handleDelete = async () => {
    setLoading(true);
    await collections.removeBill(dataItem._id);
    message.success("Xoá thành công");
    setLoading(false);
    dispatch(actions.formActions.hideDelete());
    dispatch(actions.formActions.closeForm());
    dispatch(actions.formActions.changeLoad(!loadData));
  };
  const labels = {
    id: "ID đơn hàng",
    date_created: "Ngày tạo",
    payment_staff: "Nhân viên thanh toán",
    order: "Đơn hàng :",
    dish_name: "Tên món",
    amount: "SL",
    unit_price: "Đơn giá (VND)",
    total_order: "Tổng đơn (VND)",
    tax: "Thuế VAT",
    total_money: "Tổng tiền (VND)",
    payment_methods: "Phương thức thanh toán",
  };
  return (
    <div className="ModalCont">
      {modalError && <AlertModal chilren={errorText.formValidation} />}
      <div className="headerCont">
        <h2>{getHeaderTitle()}</h2>
        <IconButton onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>
      <Form form={form} className="form" initialValues={{ modifier: "public" }}>
        <div className="bodyCont">
          <div style={{ width: "90%" }}>
            <h4>{labels.id}</h4>
            <Form.Item
              name="id"
              rules={[
                {
                  required: true,
                  message: `Không được để trống tên nhóm món`,
                },
                {
                  pattern: new RegExp(/^\w/),
                  message: errorText.space,
                },
              ]}
            >
              <Input disabled={true} placeholder="Nhập ID" />
            </Form.Item>
            <h4>{labels.date_created}</h4>
            <Form.Item
              name="createdAt"
              rules={[
                {
                  required: true,
                  message: `Không được để trống`,
                },
              ]}
            >
              <Input disabled={true} placeholder="Nhập ngày tạo" />
            </Form.Item>
            <h4>{labels.payment_staff}</h4>
            <Form.Item
              name="account_id"
              rules={[
                {
                  required: true,
                  message: `Không được để trống`,
                },
              ]}
            >
              <Input disabled={true} placeholder="Nhập nhân viên thanh toán" />
            </Form.Item>
            <h4>{labels.order}</h4>
            <div class="orderItems">
              {details.map((item) => {
                return (
                  <div className="orderCont">
                    <div className="dishCont">
                      <h4>{labels.dish_name}</h4>

                      <Input
                        disabled={true}
                        placeholder="Nhập tên món"
                        value={item.name}
                      />
                    </div>
                    <div className="dishCont">
                      <h4>{labels.amount}</h4>

                      <Input
                        disabled={true}
                        placeholder="Nhập số lượng"
                        value={
                          item.category_type
                            ? `${item.amount} ly`
                            : `${item.amount} đĩa`
                        }
                      />
                    </div>
                    <div className="dishCont">
                      <h4>{labels.unit_price}</h4>

                      <Input
                        disabled={true}
                        placeholder="Nhập đơn giá"
                        value={numbToCurrency(item.price)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <h4>{labels.total_order}</h4>
            <Form.Item
              name="price_total"
              rules={[
                {
                  required: true,
                  message: `Không được để trống`,
                },
              ]}
            >
              <Input disabled={true} placeholder="Nhập tổng đơn" />
            </Form.Item>
            <h4>{labels.tax}</h4>
            <Form.Item
              name="vat"
              rules={[
                {
                  required: true,
                  message: `Không được để trống`,
                },
              ]}
            >
              <Input disabled={true} placeholder="Nhập Thuế VAT" />
            </Form.Item>
            <h4>{labels.total_money}</h4>
            <Form.Item
              name="price_total"
              rules={[
                {
                  required: true,
                  message: `Không được để trống`,
                },
              ]}
            >
              <Input disabled={true} placeholder="Nhập tổng tiền" />
            </Form.Item>
            <h4>{labels.payment_methods}</h4>
            <Form.Item
              name="payment_type"
              rules={[
                {
                  required: true,
                  message: `Không được để trống`,
                },
              ]}
            >
              <Input
                disabled={true}
                placeholder="Nhập phương thức thanh toán"
              />
            </Form.Item>
          </div>
        </div>
        {isDetail && (
          <div
            className="BtnAdd"
            style={{ marginTop: "3vh", marginBottom: "5vh" }}
          >
            <Button
              size="Large"
              color={dataItem ? "primary" : "success"}
              variant="contained"
              style={{
                paddingLeft: "15%",
                paddingRight: "15%",
                paddingTop: "2%",
                paddingBottom: "2%",
                color: "#fff",
              }}
              disabled={loading}
              onClick={handlePrint}
            >
              In đơn
            </Button>
            <Button
              disabled={loading}
              size="Large"
              color="error"
              variant="contained"
              style={{
                paddingLeft: "15%",
                paddingRight: "15%",
                paddingTop: "2%",
                paddingBottom: "2%",
                color: "#fff",
              }}
              onClick={handleClose}
            >
              Hủy In
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
};
export default ModalContent;
