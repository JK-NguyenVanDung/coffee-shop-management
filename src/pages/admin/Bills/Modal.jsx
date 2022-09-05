import React, { useEffect, useState, useRef } from "react";
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
import { billText, shopPhone, shopAddress } from "../../../helper/Text";

import { IconButton, Typography } from "@mui/material";
import * as collections from "../../../api/Collections/bill";
import { useReactToPrint } from "react-to-print";

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
function currentDate() {
  let currentdate = new Date();
  let datetime =
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    " " +
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear();
  return datetime;
}
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
  const employeesList = useAppSelector((state) => state.employees.listAll);
  const info = useAppSelector((state) => state.auth.info);
  let billRef = useRef();

  const [details, setDetails] = useState([]);

  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  // const handlePrint = () => {
  //   dispatch(actions.formActions.closeForm());
  //   message.success("In đơn thành công");
  // };
  const handlePrint = useReactToPrint({
    content: () => billRef.current,
    pageStyle: "print",

    // pageStyle: "@page { size: 3.1496063in 10in }",

    onAfterPrint: () => {
      dispatch(actions.formActions.closeForm());
    },
  });
  const handleClose = () => dispatch(actions.formActions.closeForm());

  function getPayment(item) {
    let role = "";
    switch (item) {
      case "cash":
        role = "Tiền mặt";
        break;
      case "momo":
        role = "Momo";
        break;
      case "vnpay":
        role = "VN Pay";
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
        account_id: getUserName(dataItem.account_id),
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
  function getUserName(id) {
    for (let i = 0; i < employeesList.length; i++) {
      if (employeesList[i]._id === id) {
        return employeesList[i].full_name;
      }
    }
    return "N/A";
  }
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
  const paymentText = [
    { value: "cash", label: "Tiền mặt" },
    { value: "momo", label: "Momo" },
    { value: "vnpay", label: "VNPay" },
  ];
  const billContent = [
    { label: "ID đơn hàng", content: dataItem._id },
    {
      label: "Ngày tạo:",
      content: currentDate(),
    },
    {
      label: "Thu ngân",
      content: dataItem ? getUserName(dataItem.account_id) : "N/A",
    },
  ];
  const billContent2 = {
    label: "Tên món",
    content1: "SL ",
    content2: "Đơn giá",
  };

  const billContent3 = [
    {
      label: "Tổng đơn:",
      content: numbToCurrency(dataItem.price_total)
        ? numbToCurrency(dataItem.price_total)
        : "N/A", // Phần này add đường ngang vào tui ko biết có gì chú copy phần đó dưới á
    },
    { label: "Thuế VAT", content: "0%" },
    {
      label: "Tổng tiền:",
      content: numbToCurrency(dataItem.price_total)
        ? numbToCurrency(dataItem.price_total)
        : "N/A",
    },
    {
      label: "Phương thức thanh toán:",
      content: paymentText.map((item) => {
        if (item.value === dataItem.payment_type) {
          return item.label;
        }
      }),
    },
    { label: "Trạng thái:", content: "Đã thanh toán" },
  ];
  const PrintWrapper = React.forwardRef((props, ref) => (
    <div ref={ref}>{props.children}</div>
  ));
  const PrintBody = () => {
    return (
      <div className="billBgCont">
        {/* <div className="billHeader">
          <h2>Linh's Coffee</h2>
        </div> */}
        <div className="locationCont">
          <Typography
            sx={{ fontSize: "16pt", color: "#111", fontWeight: "bold" }}
            gutterBottom
            textAlign="left"
          >
            Địa chỉ: {shopAddress}
          </Typography>
          <Typography
            sx={{ fontSize: "16pt", color: "#111", fontWeight: "bold" }}
            gutterBottom
            textAlign="left"
          >
            SĐT: {shopPhone}
          </Typography>
        </div>
        <hr width="100%" size="1%" align="center" />

        <div className="cardCont">
          <div className="billContentsCont">
            <Typography
              sx={{
                fontSize: "20pt",
                mb: 5,
                color: "#111",
                fontWeight: "bold",
              }}
              gutterBottom
              textAlign="center"
            >
              {billText.header3}
            </Typography>
            {billContent.map((item) => {
              return (
                <>
                  <div className="billContentCont">
                    <Typography
                      sx={{
                        fontSize: "16pt",
                        color: "#111",
                        fontWeight: "bold",
                      }}
                      gutterBottom
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16pt",
                        color: "#111",
                        fontWeight: "bold",
                      }}
                      gutterBottom
                    >
                      {item.content}
                    </Typography>
                  </div>
                </>
              );
            })}
            <hr width="100%" size="1%" align="center" />
            <div className="billItemsCont">
              <Typography
                sx={{ fontSize: "16pt", color: "#111", fontWeight: "bold" }}
                gutterBottom
              >
                {billContent2.label}
              </Typography>
              <Typography
                sx={{ fontSize: "16pt", color: "#111", fontWeight: "bold" }}
                gutterBottom
              >
                {billContent2.content1}
              </Typography>
              <Typography
                sx={{
                  fontSize: "16pt",
                  color: "#111",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                gutterBottom
              >
                {billContent2.content2}
              </Typography>
            </div>
            {details.map((item) => {
              return (
                <>
                  <div className="billItemsCont">
                    <div className="rowCont">
                      <Typography
                        sx={{
                          fontSize: "16pt",
                          color: "#111",
                          fontWeight: "bold",
                        }}
                        gutterBottom
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "16pt",
                          color: "#111",
                          fontWeight: "bold",
                        }}
                        gutterBottom
                      >
                        {item.amount}
                      </Typography>
                    </div>
                    <Typography
                      sx={{
                        fontSize: "16pt",
                        color: "#111",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                      gutterBottom
                    >
                      {numbToCurrency(item.price)}
                    </Typography>
                  </div>
                </>
              );
            })}
            <hr width="100%" size="1%" align="center" />
            {billContent3.map((item) => {
              return (
                <>
                  <div className="billContentCont">
                    <Typography
                      sx={{
                        fontSize: "16pt",
                        color: "#111",
                        fontWeight: "bold",
                      }}
                      gutterBottom
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16pt",
                        color: "#111",
                        fontWeight: "bold",
                      }}
                      gutterBottom
                    >
                      {item.content}
                    </Typography>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    );
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
      <div className="printAreaCont">
        <PrintWrapper ref={billRef}>
          <PrintBody />
        </PrintWrapper>
      </div>
    </div>
  );
};
export default ModalContent;
