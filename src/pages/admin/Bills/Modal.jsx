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

  const handleChange = (newValue) => {
    setDate(newValue);
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handleOpen = () => dispatch(actions.formActions.showForm());
  const handleClose = () => dispatch(actions.formActions.closeForm());

  const deleteItem = () => {
    dispatch(actions.formActions.showDelete());
  };
  const editItem = () => dispatch(actions.formActions.setDetail(false));
  useEffect(() => {
    form.resetFields();
    const setForm = () => {
      form.setFieldsValue({
        //truyền data khi bấm vào => dataItem.
        _id: dataItem._id,
        createdAt: moment(new Date(dataItem.createdAt)).format(
          "h:mma - DD/MM/YYYY"
        ),
        price_total: dataItem.price_total,
        account_id: dataItem.account_id,
        payment_type: dataItem.payment_type,
      });
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
            body: {
              
            },
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
    if (dataItem) {
      return "Sửa nhóm món";
    }
    return "Chi tiết hóa đơn";
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
    id_order: "ID đơn hàng",
    date_created: "Ngày tạo",
    payment_staff: "Nhân viên thanh toán",
    order: "Đơn hàng :",
    dish_name: "Tên món",
    amount: "SL",
    unit_price: "Đơn giá (VND)",
    total_order: "Tổng đơn",
    tax: "Thuế VAT",
    total_money: "Tổng tiền",
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
            <h4>{labels.id_order}</h4>
            <Form.Item
              name="ID đơn hàng"
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
              <Input disabled={isDetail} placeholder="Nhập ID" />
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
              <Input disabled={isDetail} placeholder="Nhập ngày tạo" />
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
              <Input disabled={isDetail} placeholder="Nhập nhân viên thanh toán" />
            </Form.Item>
            <h4>{labels.order}</h4>
            <div className="orderCont">
              <div className="dishCont">
                <h4>{labels.dish_name}</h4>
                <Form.Item
                  name="Tên món"
                  rules={[
                    {
                      required: true,
                      message: `Không được để trống`,
                    },
                  ]}
                >
                  <Input disabled={isDetail} placeholder="Nhập tên món" />
                </Form.Item>
              </div>
              <div className="amountCont">
                <h4>{labels.amount}</h4>
                <Form.Item
                  name="SL"
                  rules={[
                    {
                      required: true,
                      message: `Không được để trống`,
                    },
                  ]}
                >
                  <Input disabled={isDetail} placeholder="Nhập số lượng" />
                </Form.Item>
              </div>
              <div className="priceCont">
                <h4>{labels.unit_price}</h4>
                <Form.Item
                  name="Đơn giá"
                  rules={[
                    {
                      required: true,
                      message: `Không được để trống`,
                    },
                  ]}
                >
                  <Input disabled={isDetail} placeholder="Nhập đơn giá" />
                </Form.Item>
              </div>
            </div>
            <h4>{labels.total_order}</h4>
            <Form.Item
              name="Tổng đơn"
              rules={[
                {
                  required: true,
                  message: `Không được để trống`,
                },
              ]}
            >
              <Input disabled={isDetail} placeholder="Nhập tổng đơn" />
            </Form.Item>
            <h4>{labels.tax}</h4>
            <Form.Item
              name="Thuế VAT"
              rules={[
                {
                  required: true,
                  message: `Không được để trống`,
                },
              ]}
            >
              <Input disabled={isDetail} placeholder="Nhập Thuế VAT" />
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
              <Input disabled={isDetail} placeholder="Nhập tổng tiền" />
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
              <Input disabled={isDetail} placeholder="Nhập phương thức thanh toán" />
            </Form.Item>
          </div>
        </div>

      </Form>

    </div>
  );
};
export default ModalContent;
