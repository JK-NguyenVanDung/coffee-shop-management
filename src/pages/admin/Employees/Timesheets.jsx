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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import { TextField, FormControl } from "@mui/material/";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { IconButton, Typography } from "@mui/material";
import * as collections from "../../../api/Collections/employees";

import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { colors } from "../../../helper/Color";
import { errorText } from "../../../helper/Text";
import ImgCrop from "antd-img-crop";

import NumberInput from "../../../components/FormElements/NumberInput";
import moment from "moment";

import AlertModal from "../../../components/FormElements/AlertModal";
import AlertDialog from "../../../components/AlertDialog";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }

  return isJpgOrPng && isLt2M;
};

const radioBtnstyles = (theme) => ({
  radio: {
    "&$checked": {
      color: "#4B8DF8",
    },
  },
  checked: {},
});

const TimeSheets = () => {
  const [loading, setLoading] = useState(false);
  const dataItem = useAppSelector((state) => state.employees.detail);
  const [date, setDate] = React.useState(new Date("2001-08-18"));
  const [status, setStatus] = React.useState("1");
  let [role, setRole] = useState(true);
  const loadData = useAppSelector((state) => state.form.loadData);
  const modalError = useAppSelector((state) => state.form.modalError);
  const isDetail = useAppSelector((state) => state.form.detail);
  const [fileList, setFileList] = useState([]);
  const [disablePass, setDisablePass] = useState(true);
  const openDialog = useAppSelector((state) => state.form.delete);
  const [email, setEmail] = useState({
    value: "",
    validateStatus: "",
    errorMsg: "",
    error: false,
  });
  const [phone, setPhone] = useState({
    value: "",
    validateStatus: "",
    errorMsg: "",
    error: false,
  });
  const [password, setPassword] = useState({
    value: "",
    validateStatus: "",
    errorMsg: "",
    error: false,
  });
  const [ID_card, setID_card] = useState({
    value: "",
    validateStatus: "",
    errorMsg: "",
    error: false,
  });

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
  const handleCheckbox = (event) => {
    if (event.target.name === "employee") setRole(true);
    else setRole(false);
  };
  const deleteItem = () => {
    dispatch(actions.formActions.showDelete());
  };
  const editItem = () => dispatch(actions.formActions.setDetail(false));
  useEffect(() => {
    form.resetFields();
    setFileList(null);

    const setForm = () => {
      form.setFieldsValue({
        email: dataItem.email,
        phone_number: dataItem.phone_number,
        password: dataItem.password,
        address: dataItem.address,
        full_name: dataItem.full_name,
        id_card: dataItem.id_card,
      });
      // nếu không có dữ liệu đặc biệt thì xoá
      setFileList([dataItem.avatar]);
      setRole(dataItem.role === 0 ? true : false);
      setStatus(dataItem.account_status);
      setDate(new Date(dataItem.date_of_birth));
    };

    if (dataItem) {
      setForm();
    }
  }, [dataItem]);
  const { employee, manager } = role;
  const error = [employee, manager].filter((v) => v).length !== 1;
  const UploadButton = () => {
    return (
      <div style={fileList === null ? { width: "19.5rem", height: "50%" } : {}}>
        <div style={{ padding: 2 }}>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          Upload
        </div>
      </div>
    );
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const handleCancel = () => {
    form.setFieldsValue({ email: "asdasd" });
  };

  function disablePassword() {
    setDisablePass(!disablePass);
  }

  function checkCustomValidation() {
    if (
      email.error ||
      phone.error ||
      password.error ||
      ID_card.error ||
      fileList.length < 1
    ) {
      return false;
    } else {
      return true;
    }
  }
  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        if (checkCustomValidation()) {
          setLoading(true);
          const temp = [];
          if (dataItem) {
            await collections.editEmployee({
              _id: dataItem._id,
              body: {
                email: values.email.replace(/\s/g, "").replace(/ /g, ""),
                phone_number: values.phone_number
                  .replace(/\s/g, "")
                  .replace(/ /g, ""),
                password: values.password.replace(/\s/g, "").replace(/ /g, ""),
                address: values.address,
                account_status: Number(status),
                role: role ? 0 : 1,
                full_name: values.full_name,
                id_card: values.id_card,
                date_of_birth:
                  date.getMonth() +
                  1 +
                  "/" +
                  date.getDate() +
                  "/" +
                  date.getFullYear(),
                avatar: fileList[0].name,
              },
            });
            handleClose();
            dispatch(actions.formActions.changeLoad(!loadData));
            message.success("Thay đổi thành công");

            setLoading(false);
          } else {
            await collections.addEmployee({
              email: values.email.replace(/\s/g, ""),
              phone_number: values.phone_number.replace(/\s/g, ""),
              password: values.password.replace(/\s/g, ""),
              address: values.address,
              account_status: Number(status),
              role: role ? 0 : 1,
              full_name: values.full_name,
              id_card: values.id_card,
              date_of_birth:
                date.getMonth() +
                1 +
                "/" +
                date.getDate() +
                "/" +
                date.getFullYear(),
              avatar: fileList[0].name,
            });
            handleClose();
            dispatch(actions.formActions.changeLoad(!loadData));
            message.success("Thêm thành công");

            setLoading(false);
          }
        } else {
          dispatch(actions.formActions.showError());
          setLoading(false);
        }
      })

      .catch((info) => {
        dispatch(actions.formActions.showError());

        setLoading(false);
      });
  };
  function isVietnamesePhoneNumberValid(number) {
    return /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(
      number
    );
  }
  function isEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
  const validateEmail = (value) => {
    if (!isEmail(value)) {
      return {
        value: value,
        validateStatus: "error",
        errorMsg: errorText.email,
        error: true,
      };
    }
    return {
      value: value,
      error: false,
    };
  };
  const validateID_card = (value) => {
    const reg = /^[0-9]{9}([0-9]{3})?$/;
    if (!reg.test(value)) {
      return {
        value: value,
        validateStatus: "error",
        errorMsg: errorText.id_card,
        error: true,
      };
    }
    return {
      value: value,
      error: false,
    };
  };
  const handleID_card = (value) => {
    setID_card(validateID_card(value.target.value));
  };

  const validatePassword = (value) => {
    const reg =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,20}$/;
    if (!reg.test(value)) {
      return {
        value: value,
        validateStatus: "error",
        errorMsg: errorText.password,
        error: true,
      };
    }
    return {
      value: value,
      error: false,
    };
  };
  const handlePassword = (value) => {
    setPassword(validatePassword(value.target.value));
  };

  const validatePhone = (value) => {
    if (!isVietnamesePhoneNumberValid(value)) {
      return {
        value: value,
        validateStatus: "error",
        errorMsg: errorText.phone2,
        error: true,
      };
    }
    return {
      value: value,
      error: false,

      validateStatus: "success",
    };
  };

  const handleEmail = (value) => {
    setEmail(validateEmail(value.target.value));
  };
  const handlePhone = (value) => {
    setPhone(validatePhone(value.target.value));
  };
  function getHeaderTitle() {
    if (dataItem) {
      return "Sửa nhân viên";
    }
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
    employee_name: "Tên nhân viên",
    communications: "Thông tin liên lạc",
    position: "Chức vụ",
    status: "Tình trạng",
    admin_payment: "Thanh toán của Admin",
    salary_total: "Tổng lương",
    work_time: "Giờ làm (h/tuần)",
    total_time: "Tổng giờ làm (h)",
    rate: "Rate/ giờ",
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
        <div className="bodyCont">
          <div style={{ width: "40%" }}>
            <h4>{labels.employee_name}</h4>
            <Form.Item
              name="Tên nhân viên"
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

            <h4 style={{ marginTop: fileList !== null ? "4.5%" : 0 }}>
              {labels.communications}
            </h4>
            <Form.Item
              name="Thông tin liên lạc"
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
              <Input disabled placeholder="Nhập thông tin liên lạc" />
            </Form.Item>
            <h4>{labels.position}</h4>
            <Form.Item
              name="Chức vụ"
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
            <h4>{labels.status}</h4>
            <Form.Item
              name="Tình trạng"
              rules={[
                {
                  required: true,
                  message: `Không được để trống tình trạng`,
                },
                {
                  pattern: new RegExp(/^\w/),
                  message: errorText.space,
                },
              ]}
            >
              <Input disabled placeholder="Nhập tình trạng" />
            </Form.Item>
            <h4>{labels.admin_payment}</h4>
            <div style={{ marginBottom: "5%" }}>
              <div className="PositionAdd">
                <div className="paidCont">
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={isDetail}
                        onChange={handleCheckbox}
                        checked={role}
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
                        checked={!role}
                      />
                    }
                    name="unpaid"
                    label="Chưa thanh toán"
                  />
                </div>
              </div>
            </div>
            <h4>{labels.salary_total}</h4>
            <Form.Item
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
            >
              <Input disabled placeholder="Nhập tổng lương" />
            </Form.Item>
          </div>
          <div>
            <h4>{labels.work_time}</h4>
            <img src="Analitcs Report.png" height="150px" width="100%" />
            <div className="workCont">
              <div className="total_time">
                <h4>{labels.total_time}</h4>
                <Form.Item
                  name="Tổng giờ làm"
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
                  <Input disabled placeholder="Nhập tổng giờ làm" />
                </Form.Item>
              </div>
              <div className="rate">
                <h4>{labels.rate}</h4>
                <Form.Item
                  name="Rate/giờ"
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
                  <Input disabled placeholder="Nhập rate/giờ" />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
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
            // onClick={dataItem && isDetail === true ? editItem : handleOk}
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
            // onClick={dataItem && isDetail === true ? editItem : handleOk}
          >
            Hủy
          </Button>
        </div>
      </Form>
      <AlertDialog
        children={`Xác nhận xoá ${dataItem ? dataItem.full_name : null} ?`}
        title="Xoá nhân viên"
        onAccept={handleDelete}
      />
    </div>
  );
};
export default TimeSheets;
