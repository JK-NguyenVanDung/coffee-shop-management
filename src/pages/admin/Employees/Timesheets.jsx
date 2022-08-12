import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
// import MyPagination from "../../../components/Pagination";
import { Input, Form, message, Select, InputNumber } from "antd";
import { useReactToPrint } from "react-to-print";

import { Line } from "@ant-design/charts";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
// import { actions } from "../../../redux";
import "./index.scss";

import Button from "@mui/material/Button";
import { CloseOutlined } from "@ant-design/icons";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import {
  TextField,
  FormControl,
  CardContent,
  InputLabel,
} from "@mui/material/";

import { IconButton, Typography } from "@mui/material";
import * as collections from "../../../api/Collections/employees";

import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { colors } from "../../../helper/Color";
import { errorText } from "../../../helper/Text";
import ImgCrop from "antd-img-crop";

import NumberInput from "../../../components/FormElements/NumberInput";
import moment from "moment";

import AlertModal from "../../../components/FormElements/AlertModal";
import AlertDialog from "../../../components/AlertDialog";
import { Print } from "@mui/icons-material";
const { Option } = Select;
const { TextArea } = Input;

const TimeSheets = () => {
  const [loading, setLoading] = useState(false);
  const dataItem = useAppSelector((state) => state.employees.detail);
  const [date, setDate] = React.useState(new Date("2001-08-18"));
  const [status, setStatus] = React.useState("1");
  let [role, setRole] = useState(true);
  const loadData = useAppSelector((state) => state.form.loadData);
  const modalError = useAppSelector((state) => state.form.modalError);
  const isDetail = useAppSelector((state) => state.form.detail);

  const [note, setNote] = useState("");
  const [paid, setPaid] = useState(false);

  const [disablePass, setDisablePass] = useState(true);
  const openDialog = useAppSelector((state) => state.form.delete);
  const [bonus, setBonus] = useState(0);
  const [punish, setPunish] = useState(0);
  const [total, setTotal] = useState(0);
  const [miscalculation, setMiscalculation] = useState(0);
  const [payrate, setPayrate] = useState(0);

  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handleOpen = () => dispatch(actions.formActions.showForm());
  const handleClose = () => dispatch(actions.formActions.closeSecondForm());
  const handleCheckbox = (event) => {
    if (event.target.name === "paid") setPaid(true);
    else setPaid(false);
  };
  const deleteItem = () => {
    dispatch(actions.formActions.showDelete());
  };
  const editItem = () => dispatch(actions.formActions.setDetail(false));
  function getStatus(item) {
    if (item === 1) {
      return "Còn làm";
    } else if (item === 0) {
      return "Tạm nghỉ";
    }
    return "Đã nghỉ";
  }

  function endOfMonth() {
    return false;
  }
  useEffect(() => {
    form.resetFields();

    const setForm = () => {
      form.setFieldsValue({
        email: dataItem.email,
        phone_number: dataItem.phone_number,
        password: dataItem.password,
        address: dataItem.address,
        full_name: dataItem.full_name,
        id_card: dataItem.id_card,
        userInfo:
          "CMND: " +
          dataItem.id_card +
          ", Địa chỉ: " +
          dataItem.address +
          ", SĐT: " +
          dataItem.phone_number,
        role: dataItem.role === 0 ? "Nhân viên" : "Quản lý",
        status: getStatus(dataItem.account_status),
        system_total: 12,
        bonus: null,
        punish: null,
        payrate: 0,
        total_margin: 12,
      });
      // nếu không có dữ liệu đặc biệt thì xoá
      // setRole(dataItem.role === 0 ? true : false);
      // setStatus(dataItem.account_status);
      // setDate(new Date(dataItem.date_of_birth));
    };

    if (dataItem) {
      setForm();
    }
  }, [dataItem]);

  useEffect(() => {
    let final = miscalculation * payrate;
    final -= punish;
    final += bonus;
    console.log(final);
    setTotal(final);
  }, [miscalculation, payrate, bonus, punish]);
  function checkCustomValidation() {
    return true;
  }
  let billRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => billRef.current,

    documentTitle: "Hoá đơn quán LINH COFFEE",
    pageStyle: "print",

    onAfterPrint: () => {
      dispatch(actions.formActions.closeForm());
      message.success("In đơn thành công");
    },
  });
  const PrintWrapper = React.forwardRef((props, ref) => (
    <div ref={ref}>{props.children}</div>
  ));
  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        const temp = [];
        // if (dataItem) {
        //   // await collections.editEmployee({
        //   //   _id: dataItem._id,
        //   //   body: {

        //   //   },
        //   // });

        // } else {
        //   await collections.addEmployee({
        //     email: values.email.replace(/\s/g, ""),
        //     phone_number: values.phone_number.replace(/\s/g, ""),
        //     password: values.password.replace(/\s/g, ""),
        //     address: values.address,
        //     account_status: Number(status),
        //     role: role ? 0 : 1,
        //     full_name: values.full_name,
        //     id_card: values.id_card,
        //     date_of_birth:
        //       date.getMonth() +
        //       1 +
        //       "/" +
        //       date.getDate() +
        //       "/" +
        //       date.getFullYear(),
        //   });
        //   handleClose();
        //   dispatch(actions.formActions.changeLoad(!loadData));
        //   message.success("Thêm thành công");

        //   setLoading(false);
        // }

        handleClose();
        dispatch(actions.formActions.changeLoad(!loadData));
        message.success("Xuất file thành công");

        setLoading(false);
      })

      .catch((info) => {
        dispatch(actions.formActions.showError());

        setLoading(false);
      });
  };

  const validatePhone = (value) => {
    if (true) {
      return {
        value: value,
        errorMsg: errorText.phone2,
        error: true,
      };
    }
    return {
      value: value,
      error: false,
    };
  };

  // const handleBonus = (value) => {
  //   setBonus(validateBonus(value));
  // };
  // const handlePunish = (value) => {
  //   setPunish(validatePunish(value));
  // };
  function getHeaderTitle() {
    // if (dataItem) {
    //   return "Sửa nhân viên";
    // }
    return "Bảng chấm công";
  }

  const handleDelete = async () => {
    setLoading(true);
    await collections.removeEmployee(dataItem._id);
    message.success("Xoá thành công");
    setLoading(false);
    dispatch(actions.formActions.hideDelete());
    dispatch(actions.formActions.closeForm());
    dispatch(actions.formActions.changeLoad(!loadData));
  };
  const labels = {
    full_name: "Tên nhân viên",
    userInfo: "Thông tin liên lạc",
    role: "Chức vụ",
    status: "Tình trạng",
    admin_payment: "Thanh toán của Admin",
    salary_total: "Tổng lương",
    work_time: "Giờ làm (h/tuần)",
    total_time1: "Tổng giờ làm (trên hệ thống)",
    total_time2: "Tổng giờ làm (nếu có sai số)",
    rate: "Rate/ giờ (VND)",
    month: "Bảng lương tháng",
    bonus: "Lương thưởng (VND)",
    punish: "Phạt lương (VND)",
  };
  const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];
  const config = {
    data,
    height: 400,
    xField: "year",
    yField: "value",
    point: {
      size: 5,
      shape: "diamond | circule",
    },
    tooltip: {
      formatter: (data) => {
        return {
          name: "",
          value: "",
        };
      },
      customContent: (name, data) =>
        `<div>${data?.map((item) => {
          return `<div class="tooltip-chart" >
              <span class="tooltip-item-name">${item?.name}</span>
              <span class="tooltip-item-value">${item?.value}</span>
            </div>`;
        })}</div>`,
      showMarkers: true,
      showContent: true,
      position: "right | left",
      showCrosshairs: true,
    },
  };
  return (
    <div className="ModalCont">
      {modalError && <AlertModal chilren={errorText.formValidation} />}
      <div className="headerTimekeeping">
        <h2>{getHeaderTitle()}</h2>
        <IconButton onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>
      <Form form={form} className="form" initialValues={{ modifier: "public" }}>
        <PrintWrapper ref={billRef}>
          <div className="selectCont">
            <h4>{labels.month}</h4>

            <div>
              <Select
                dropdownStyle={{ zIndex: 2000 }}
                placeholder="Nhập loại menu"
                defaultValue="8"
              >
                <Option value="8">Tháng 8</Option>
              </Select>
            </div>
          </div>
          <div className="bodyCont">
            <div style={{ width: "40%" }}>
              <h4>{labels.full_name}</h4>
              <Form.Item
                name="full_name"
                rules={[
                  {
                    required: true,
                    message: `Không được để trống họ tên`,
                  },
                  {
                    pattern: new RegExp(/^\w/),
                    message: errorText.space,
                  },
                ]}
              >
                <Input disabled placeholder="Nhập họ tên" />
              </Form.Item>

              <h4>{labels.userInfo}</h4>
              <Form.Item
                name="userInfo"
                rules={[
                  {
                    required: true,
                    message: `Không được để trống thông tin liên lạc`,
                  },
                  {
                    pattern: new RegExp(/^\w/),
                    message: errorText.space,
                  },
                ]}
              >
                <TextArea
                  disabled
                  placeholder="Nhập thông tin liên lạc"
                  rows={3}
                  maxLength={6}
                />
              </Form.Item>
              <div className="leftConts">
                <div className="cont1">
                  <h4>{labels.role}</h4>
                  <Form.Item
                    name="role"
                    rules={[
                      {
                        required: true,
                        message: `Không được để trống chức vụ`,
                      },
                      {
                        pattern: new RegExp(/^\w/),
                        message: errorText.space,
                      },
                    ]}
                  >
                    <Input disabled placeholder="Nhập chức vụ" />
                  </Form.Item>
                </div>
                <div className="cont2">
                  <h4>{labels.status}</h4>
                  <Form.Item
                    name="status"
                    rules={[
                      {
                        required: true,
                        message: `Không được để trống tình trạng`,
                      },
                    ]}
                  >
                    <Input disabled placeholder="Nhập tình trạng" />
                  </Form.Item>
                </div>
              </div>
              <h4>{labels.admin_payment}</h4>
              <div style={{ marginBottom: "5%" }}>
                <div className="PositionAdd">
                  <div className="paidCont">
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled={isDetail}
                          onChange={handleCheckbox}
                          checked={paid}
                        />
                      }
                      name="paid"
                      label="Đã thanh toán"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled={isDetail}
                          onChange={handleCheckbox}
                          checked={!paid}
                        />
                      }
                      name="unpaid"
                      label="Chưa thanh toán"
                    />
                  </div>
                </div>
              </div>
              <div className="leftConts">
                <div className="cont1">
                  <h4>{labels.bonus}</h4>
                  <Form.Item
                    name="bonus"
                    rules={[
                      {
                        pattern: new RegExp(/^\w/),
                        message: errorText.space,
                      },
                    ]}
                  >
                    <InputNumber
                      formatter={
                        bonus === 0
                          ? null
                          : (value) =>
                              `${value} `.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      min={0}
                      max={1000000000000}
                      style={{ minWidth: "100%" }}
                      onChange={(e) => setBonus(e)}
                      disabled={endOfMonth()}
                      placeholder="(Không bắt buộc)"
                    />
                  </Form.Item>
                </div>
                <div className="cont2">
                  <h4>{labels.punish}</h4>
                  <Form.Item
                    name="punish"
                    rules={[
                      {
                        pattern: new RegExp(/^\w/),
                        message: errorText.space,
                      },
                    ]}
                  >
                    <InputNumber
                      formatter={
                        punish === 0
                          ? null
                          : (value) =>
                              `${value} `.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      min={0}
                      max={1000000000000}
                      style={{ minWidth: "100%" }}
                      onChange={(e) => setPunish(e)}
                      disabled={endOfMonth()}
                      placeholder="(Không bắt buộc)"
                    />
                  </Form.Item>
                </div>
              </div>
              <h4>{labels.salary_total}</h4>
              {/* <Form.Item
              name="Tổng lương"
              rules={[
                {
                  required: true,
                  message: `Không được để trống tổng lương`,
                },
                {
                  pattern: new RegExp(/^\w/),
                  message: errorText.space,
                },
              ]}
            > */}
              <Input
                disabled={true}
                value={total + " VNĐ"}
                style={{ minWidth: "100%" }}
                placeholder={`0 VNĐ`}
              />
              {/* </Form.Item> */}
            </div>
            <div style={{ width: "50%" }}>
              <h4>{labels.work_time}</h4>
              <Line {...config} style={{ marginBottom: 10, height: "56.2%" }} />
              <div className="workCont">
                <div className="total_time1">
                  <h4>{labels.total_time1}</h4>
                  <Form.Item
                    name="system_total"
                    rules={[
                      {
                        required: true,
                        message: `Không được để trống tổng giờ làm`,
                      },
                    ]}
                  >
                    <Input disabled={true} placeholder="Nhập tổng giờ làm" />
                  </Form.Item>
                </div>
                <div className="total_time2">
                  <h4>{labels.total_time2}</h4>
                  <Form.Item
                    name="total_margin"
                    rules={[
                      {
                        required: true,
                        message: `Không được để trống tổng giờ làm`,
                      },
                      {
                        pattern: new RegExp(/^\w/),
                        message: errorText.space,
                      },
                    ]}
                  >
                    <InputNumber
                      formatter={
                        miscalculation === 0
                          ? null
                          : (value) =>
                              `${value} `.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      min={0}
                      max={1000000000000}
                      style={{ minWidth: "100%" }}
                      disabled={endOfMonth()}
                      onChange={(e) => setMiscalculation(e)}
                      placeholder="Nhập tổng giờ làm"
                    />
                  </Form.Item>
                </div>
              </div>
              <h4>{labels.rate}</h4>
              <Form.Item
                name="payrate"
                rules={[
                  {
                    required: true,
                    message: `Không được để trống rate/giờ`,
                  },
                  {
                    pattern: new RegExp(/^\w/),
                    message: errorText.space,
                  },
                ]}
              >
                <InputNumber
                  formatter={
                    payrate === 0
                      ? null
                      : (value) =>
                          `${value} `.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  min={0}
                  max={1000000000000}
                  style={{ minWidth: "100%" }}
                  disabled={endOfMonth()}
                  onChange={(e) => setPayrate(e)}
                  placeholder="Nhập rate/giờ"
                />
              </Form.Item>
            </div>
          </div>
          <CardContent>
            <div className="noteSalary">
              <TextField
                placeholder="Nhập ghi chú của quản lý ở đây"
                label="Ghi chú (Không bắt buộc)"
                multiline
                rows={2}
                id="my-input"
                maxRows={4}
                value={note}
                variant="outlined"
                onChange={(e) => {
                  setNote(e.target.value);
                }}
                fullWidth
              />
            </div>
          </CardContent>
        </PrintWrapper>
        <div className="btnTimekeeping">
          <Button
            size="Large"
            color={"success"}
            variant="contained"
            style={{
              paddingLeft: "10%",
              paddingRight: "10%",
              paddingTop: "2%",
              paddingBottom: "2%",
              color: "#fff",
            }}
            onClick={handlePrint}
          >
            Xuất File
          </Button>
          <Button
            size="Large"
            color="error"
            variant="contained"
            style={{
              paddingLeft: "10%",
              paddingRight: "10%",
              paddingTop: "2%",
              paddingBottom: "2%",
              color: "#fff",
            }}
            onClick={() => handleClose()}
          >
            Hủy
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default TimeSheets;
