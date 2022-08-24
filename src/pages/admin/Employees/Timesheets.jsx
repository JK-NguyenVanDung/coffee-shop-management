import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
// import MyPagination from "../../../components/Pagination";
import { Input, Form, message, Select, InputNumber } from "antd";
import { useReactToPrint } from "react-to-print";

import { Line } from "@ant-design/charts";
import Loading from "../../../components/Loading";
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
import * as workLogCollections from "../../../api/Collections/workLog";

import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { colors } from "../../../helper/Color";
import { errorText } from "../../../helper/Text";
import { numbToDecimal } from "../../../helper/currency";

import ImgCrop from "antd-img-crop";

import NumberInput from "../../../components/FormElements/NumberInput";
import moment from "moment";

import AlertModal from "../../../components/FormElements/AlertModal";
import AlertDialog from "../../../components/AlertDialog";
import { Print } from "@mui/icons-material";

import { Column } from "@ant-design/plots";

const WorkColumn = (props) => {
  let data = useAppSelector((state) =>
    state.employees.workLog ? state.employees.workLog : []
  );
  let month = useAppSelector((state) =>
    state.employees.selectedMonth != ""
      ? state.employees.selectedMonth
      : new Date().getMonth() + 1 + "-" + new Date().getFullYear()
  );
  let workedTime = 0;
  // data = data.filter((item) => item.date.split("/")[1] === month);
  let monthData = [];
  for (let i = 0; i < data.length; i++) {
    let monthYear =
      data[i].date.split("/")[1] + "-" + data[i].date.split("/")[2];
    if (monthYear == month) {
      monthData.push(data[i]);
      workedTime += data[i].hour;
    }
  }
  data = monthData;
  const dispatch = useAppDispatch();

  dispatch(actions.employeesActions.setWorkedTime(workedTime));

  //   {
  //     date: "19/02/2022",
  //     hour: 8,
  //   },
  //   {
  //     date: "20/02/2022",
  //     hour: 4,
  //   },
  // ];
  const config = {
    data,
    xField: "date",
    yField: "hour",
    label: {
      position: "middle",
      // 'top', 'bottom', 'middle',

      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    yAxis: {
      line: {
        style: {
          lineDash: [0, 0],
          lineWidth: 1,
          stroke: "#e9e9e9",
        },
      },

      label: {
        formatter: (val) => {
          return val + "h";
        },
      },
    },
    meta: {
      date: {
        alias: "Ngày",
      },
      hour: {
        alias: "Giờ làm việc",
      },
    },
  };
  return <Column {...config} {...props} />;
};
const { Option } = Select;
const { TextArea } = Input;

const TimeSheets = () => {
  const [loading, setLoading] = useState(false);
  const dataItem = useAppSelector((state) => state.employees.detail);
  const workLog = useAppSelector((state) =>
    state.employees.workLog ? state.employees.workLog : []
  );
  const workedTime = useAppSelector((state) => state.employees.workedTime);
  const monthYear = useAppSelector((state) => state.employees.selectedMonth);
  const workTimeInfo = useAppSelector((state) => state.employees.workTimeInfo);
  const currentData = useAppSelector((state) => state.employees.currentData);

  const [date, setDate] = React.useState(new Date("2001-08-18"));
  const [status, setStatus] = React.useState("1");
  let [role, setRole] = useState(true);
  const loadData = useAppSelector((state) => state.form.loadData);
  const modalError = useAppSelector((state) => state.form.modalError);
  const isDetail = useAppSelector((state) => state.form.detail);
  const [note, setNote] = useState("");
  const [paid, setPaid] = useState(false);
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState("");
  const [disablePass, setDisablePass] = useState(true);
  const openDialog = useAppSelector((state) => state.form.delete);
  const [bonus, setBonus] = useState(0);
  const [punish, setPunish] = useState(0);
  const [total, setTotal] = useState(0);
  const [miscalculation, setMiscalculation] = useState(0);
  const [payrate, setPayrate] = useState(0);
  const show = useAppSelector((state) => state.auth.accessRight);

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
  function handleNote(e) {
    e.preventDefault();
    setNote(e.target.value);
  }
  async function fetchData() {
    setLoading(true);

    let res = await workLogCollections.getSingleWorkLog({
      account: dataItem._id,
    });
    let re = await workLogCollections.getWorkTime({
      account: dataItem._id,
    });
    dispatch(actions.employeesActions.setWorkTimeInfo(re.work_logs));

    let test = {
      _id: "62f61f2ed4e70db4a08b58f6",
      logout_time: "2022-07-12T11:04:04.055Z",
      work_log_days: "2022712",
      working_time: 2.47,
      createdAt: "2022-07-12T11:04:04.055Z",
    };

    let data = res.work_logs;
    data.push(test);
    let chartData = [];
    let ops = [];
    let countTotal = 0;
    for (let i = 0; i < data.length; i++) {
      ops.push(
        new Date(data[i].createdAt).getMonth() +
          1 +
          "-" +
          new Date(data[i].createdAt).getFullYear()
      );
      if (data[i].working_time) {
        chartData.push({
          date: new Date(data[i].logout_time).toLocaleDateString("vi-VN"),
          hour: data[i].working_time,
        });
      }
    }

    let uniqOptions = ops.filter(
      (v, i, a) => v !== "NaN-NaN" && a.indexOf(v) === i
    );

    setOptions(uniqOptions);
    let op = "";

    for (let i = 0; i < uniqOptions.length; i++) {
      let month = new Date().getMonth() + 1 + "-" + new Date().getFullYear();
      if (uniqOptions[i] == month) {
        op = uniqOptions[i];
      }
    }

    setOption(op);
    for (let i = 0; i < chartData.length; i++) {
      let date =
        chartData[i].date.split("/")[1] + "-" + chartData[i].date.split("/")[2];
      if (op === date) {
        countTotal += chartData[i].hour;
      }
    }

    dispatch(actions.employeesActions.setWorkedTime(countTotal));

    dispatch(actions.employeesActions.setWorkLog(chartData));
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, [dataItem, loadData]);
  useEffect(() => {
    form.resetFields();

    let valid = workTimeInfo.length > 0;

    let data = null;
    if (valid) {
      for (let i = 0; i < workTimeInfo.length; i++) {
        let temp = workTimeInfo[i].month + "-" + workTimeInfo[i].year;

        let my = monthYear
          ? monthYear
          : new Date().getMonth() + 1 + "-" + new Date().getFullYear();

        if (temp === my) {
          data = workTimeInfo[i];
          break;
        }
      }
    }

    dispatch(actions.employeesActions.setCurrentData(data));

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
        system_total: workedTime,
        bonus: data ? data.bonus : null,
        punish: data ? data.punish : null,
        payRate: data ? data.payRate : null,
        total_margin: data ? data.systemWorkTime : workedTime,
        note: data ? data.note : null,
      });
      setMiscalculation(data ? data.systemWorkTime : workedTime);
      setPayrate(data ? data.payRate : 0);

      // nếu không có dữ liệu đặc biệt thì xoá
      // setRole(dataItem.role === 0 ? true : false);
      // setStatus(dataItem.account_status);
      // setDate(new Date(dataItem.date_of_birth));
    };

    if (dataItem) {
      setForm();
    }
  }, [workedTime, workTimeInfo]);

  useEffect(() => {
    let final = Number(miscalculation) * Number(payrate);
    final -= Number(punish);
    final += Number(bonus);
    setTotal(Number(final));
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
    },
  });
  const PrintWrapper = React.forwardRef((props, ref) => (
    <div ref={ref}>{props.children}</div>
  ));
  const validateForm = async (e) => {
    form
      .validateFields()
      .then(async (values) => {
        handlePrint(e);
      })
      .catch((info) => {});
  };
  const handleOk = async () => {
    // await workLogCollections.removeWorkTime(workTimeInfo[0]._id);

    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        const temp = [];

        if (currentData) {
          await workLogCollections.editWorkTime({
            _id: currentData._id,
            body: {
              bonus: values.bonus,
              punish: values.punish,
              systemWorkTime: values.total_margin,
              totalSalary: total,
              payRate: values.payRate,
              note: values.note,
              paymentStatus: paid,
            },
          });
        } else {
          await workLogCollections.addWorkTime({
            bonus: values.bonus,
            punish: values.punish,
            systemWorkTime: values.total_margin,
            totalSalary: total,
            payRate: values.payRate,
            note: values.note,
            month: monthYear
              ? monthYear.split("-")[0]
              : new Date().getMonth() + 1,
            year: monthYear
              ? monthYear.split("-")[1]
              : new Date().getFullYear(),
            account_id: dataItem._id,
            paymentStatus: paid,
          });
        }
        // handleClose();
        dispatch(actions.formActions.changeLoad(!loadData));
        message.success("Lưu thành công");
        setLoading(false);
        // }

        // handleClose();
        // dispatch(actions.formActions.changeLoad(!loadData));

        // setLoading(false);
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
  function handleSelect(e) {
    setOption(e);
    dispatch(actions.employeesActions.selectedMonth(e));
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
    work_time: "Giờ làm (h/ngày)",
    total_time1: "Tổng giờ làm (trên hệ thống)",
    total_time2: "Tổng giờ làm (nếu có sai số)",
    rate: "Tiền/ giờ (VND)",
    month: "Bảng lương tháng",
    bonus: "Lương thưởng (VND)",
    punish: "Phạt lương (VND)",
  };

  return (
    <div className="ModalCont">
      <Loading loading={loading} />
      {modalError && <AlertModal chilren={errorText.formValidation} />}
      <div className="headerTimekeeping">
        <h2>{getHeaderTitle()}</h2>
        <IconButton onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>
      <Form form={form} className="form">
        <PrintWrapper ref={billRef}>
          <div className="selectCont">
            <h4>{labels.month}</h4>

            <div>
              {/* <Select
                dropdownStyle={{ zIndex: 2000 }}
                placeholder="Nhập loại menu"
                defaultValue="8"
              >
                <Option value="8">Tháng 8</Option>
              </Select> */}
              <Select
                dropdownStyle={{ zIndex: 2000 }}
                placeholder="Chọn tháng"
                onChange={handleSelect}
                value={option !== "" ? option : options[0]}
              >
                {options.map((item) => {
                  return <Option value={item}>Tháng {item}</Option>;
                })}
              </Select>
            </div>
          </div>
          <div className="timesheetsCont">
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "55%",
                  display: "flex",
                  flexDirection: "column",
                  paddingRight: "4%",
                }}
              >
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
                  <Input
                    style={{ minWidth: "100%" }}
                    disabled
                    placeholder="Nhập họ tên"
                  />
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
              </div>

              <div
                style={{
                  width: "55%",
                  display: "flex",
                  flexDirection: "column",
                  paddingRight: "4%",
                }}
              >
                <h4>{labels.work_time}</h4>
                <WorkColumn style={{ marginBottom: 10, height: "80%" }} />
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "55%",
                  display: "flex",
                  flexDirection: "column",
                  paddingRight: "4%",
                }}
              >
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
                                `${value} `.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                )
                        }
                        min={0}
                        max={1000000000000}
                        style={{ minWidth: "100%" }}
                        onBlur={(e) => setBonus(e.target.value)}
                        disabled={endOfMonth()}
                        placeholder="Không bắt buộc"
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
                                `${value} `.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                )
                        }
                        min={0}
                        max={1000000000000}
                        style={{ minWidth: "100%" }}
                        onBlur={(e) => setPunish(e.target.value)}
                        disabled={endOfMonth()}
                        placeholder="Không bắt buộc"
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
              */}
                <Input
                  disabled={true}
                  value={numbToDecimal(total) + " VNĐ"}
                  style={{ minWidth: "100%" }}
                  placeholder={`0 VNĐ`}
                />
                {/* </Form.Item> */}
              </div>

              <div
                style={{
                  width: "55%",
                  display: "flex",
                  flexDirection: "column",
                  paddingRight: "4%",
                }}
              >
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
                                `${value} `.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                )
                        }
                        min={0}
                        max={1000000000000}
                        style={{ minWidth: "100%" }}
                        disabled={endOfMonth()}
                        onBlur={(e) => setMiscalculation(e.target.value)}
                        placeholder="Nhập tổng giờ làm"
                      />
                    </Form.Item>
                  </div>
                </div>

                <div>
                  <h4>{labels.rate}</h4>
                  <Form.Item
                    name="payRate"
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
                      onBlur={(e) => setPayrate(e.target.value)}
                      placeholder="Nhập tiền/giờ"
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
          <div className="noteSalary">
            <Form.Item
              name="note"
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
              <TextField
                placeholder="Nhập ghi chú của quản lý ở đây"
                label="Ghi chú (Không bắt buộc)"
                multiline
                rows={2}
                id="my-input"
                maxRows={4}
                variant="outlined"
                fullWidth
              />
            </Form.Item>
          </div>
        </PrintWrapper>
        <div className="btnTimekeeping">
          <Button
            size="Large"
            color={"primary"}
            variant="contained"
            style={{
              paddingLeft: "10%",
              paddingRight: "10%",
              paddingTop: "2%",
              paddingBottom: "2%",
              color: "#fff",
            }}
            onClick={handleOk}
          >
            Lưu
          </Button>
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
            onClick={(e) => validateForm(e)}
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
