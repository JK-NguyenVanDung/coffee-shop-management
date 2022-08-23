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
import * as uploadAPI from "../../../api/Collections/upload";

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
  const isLt5M = file.size / 1024 / 1024 >= 5;
  console.log(file.size / 1024 / 1024);
  if (isLt5M) {
    message.error("Ảnh phải nhỏ hơn 5MB!");
  }

  return isLt5M;
};

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
  const [previewFile, setPreviewFile] = useState("");
  const errorTextType = useAppSelector((state) => state.form.errorText);
  const accessRight = useAppSelector((state) => state.auth.accessRight);

  // const uploadImage = useAppSelector((state) => state.form.image);
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

      // ... do something with the file or return it

      setFileList([
        {
          uid: dataItem.avatar,
          url: dataItem.avatar,
        },
      ]);
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
      <div style={fileList === null ? { height: "50%" } : {}}>
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
      (fileList !== null && fileList.length <= 0)
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

          const response = await collections.getEmployees();
          let uniq = response.filter(
            (item) =>
              item.email === values.email.replace(/\s/g, "") ||
              item.id_card === values.id_card ||
              item.phone_number === values.phone_number.replace(/\s/g, "")
          );
          let res = null;
          if (fileList[0].originFileObj) {
            const fmData = new FormData();
            fmData.append("file", fileList[0].originFileObj);
            res = await uploadAPI.upload(fmData);
          }

          if (dataItem) {
            if (uniq.length === 1 && uniq[0]._id === dataItem._id) {
              await collections.editEmployee({
                _id: dataItem._id,
                body: {
                  email: values.email.replace(/\s/g, "").replace(/ /g, ""),
                  phone_number: values.phone_number
                    .replace(/\s/g, "")
                    .replace(/ /g, ""),
                  password: values.password
                    .replace(/\s/g, "")
                    .replace(/ /g, ""),
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
                  avatar: res !== null ? res.name3 : dataItem.avatar,
                },
              });
              handleClose();
              dispatch(actions.formActions.changeLoad(!loadData));
              message.success("Thay đổi thành công");
            } else {
              dispatch(
                actions.formActions.showError(
                  "Trùng lặp email hoặc SĐT hoặc CMND/CCCD với nhân viên đã tồn tại"
                )
              );
            }
            setLoading(false);
          } else {
            if (uniq.length === 0) {
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
                avatar: res !== null ? res.name3 : "",
              });
              handleClose();
              dispatch(actions.formActions.changeLoad(!loadData));
              message.success("Thêm thành công");
            } else {
              dispatch(
                actions.formActions.showError(
                  "Không thể thêm 1 email hoặc SĐT hoặc CMND/CCCD đã tồn tại"
                )
              );
            }
            setLoading(false);
          }
          setLoading(false);
        } else {
          dispatch(actions.formActions.showError());
          setLoading(false);
        }
      })

      .catch((e) => {
        dispatch(actions.formActions.showError());
        console.log(e);

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
    if (dataItem && isDetail) {
      return "Thông tin nhân viên";
    }
    if (dataItem) {
      return "Sửa nhân viên";
    }
    return "Thêm nhân viên";
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
    avatar: "Hình ảnh",
    fullname: "Họ tên",
    birthday: "Ngày sinh",
    idcard: "CMND/CCCD",
    email: "Email",
    phone: "SĐT",
    password: "Mật khẩu",
    repeatPassword: "Nhập lại Mật khẩu",
    address: "Địa chỉ",
    status: "Tình trạng",
    position: "Chức vụ",
  };

  async function upload(file) {}
  return (
    <div className="ModalCont">
      {modalError && (
        <AlertModal
          chilren={
            errorTextType === "" ? errorText.formValidation : errorTextType
          }
        />
      )}
      <div className="headerCont">
        <h2>{getHeaderTitle()}</h2>
        <IconButton onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>
      <Form form={form} className="form" initialValues={{ modifier: "public" }}>
        <div className="employeesCont">
          <div className="sectionCont">
            <div className="leftSectionCont">
              <h4>{labels.avatar}</h4>
              <div className="avatarCont">
                {/* <ImgCrop rotate> */}
                <Upload
                  accept="image/*"
                  action={"https://localhost:3000"}
                  listType="picture-card"
                  fileList={fileList}
                  maxCount={1}
                  onChange={onChange}
                  beforeUpload={beforeUpload}
                  onPreview={onPreview}
                  style={{ width: "400px", height: "100%" }}
                  disabled={isDetail || accessRight === false}
                >
                  <UploadButton />
                </Upload>

                {/* </ImgCrop> */}
              </div>
              <p
                style={{
                  marginBottom: "2.7vh",
                  fontSize: "0.6rem",
                  display: "flex",
                  width: "97%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {
                  "(Chọn ảnh nền tối, kích thước 200x200 và kích cỡ file dưới 5mb)"
                }
              </p>
            </div>
            <div className="rightSectionCont">
              <h4>{labels.email}</h4>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: `Không được để trống email`,
                  },
                ]}
                validateStatus={
                  email.validateStatus !== "" ? email.validateStatus : undefined
                }
                help={email.errorMsg !== "" ? email.errorMsg : undefined}
              >
                <Input
                  style={{ minWidth: "100%" }}
                  disabled={isDetail || accessRight === false}
                  placeholder="Nhập email"
                  value={email}
                  onChange={(e) => handleEmail(e)}
                />
              </Form.Item>

              <h4>{labels.phone}</h4>
              <Form.Item
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: `Không được để trống số điện thoại`,
                  },
                ]}
                validateStatus={
                  phone.validateStatus !== "" ? phone.validateStatus : undefined
                }
                help={phone.errorMsg !== "" ? phone.errorMsg : undefined}
              >
                <Input
                  style={{ minWidth: "100%" }}
                  disabled={isDetail || accessRight === false}
                  value={phone.value}
                  placeholder="Nhập số điện thoại"
                  onChange={(value) => handlePhone(value)}
                />
              </Form.Item>

              <h4>{labels.password}</h4>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: `Không được để trống mật khẩu`,
                  },
                ]}
                validateStatus={
                  password.validateStatus !== ""
                    ? password.validateStatus
                    : undefined
                }
                help={password.errorMsg !== "" ? password.errorMsg : undefined}
              >
                {dataItem ? (
                  <Input.Password
                    style={{ minWidth: "100%" }}
                    placeholder="Nhập mật khẩu"
                    disabled={disablePass || isDetail}
                    value={password.value}
                    onChange={(value) => handlePassword(value)}
                    prefix={
                      <IconButton
                        disabled={isDetail || accessRight === false}
                        onClick={() => disablePassword()}
                      >
                        {!disablePass || isDetail ? (
                          <LockOpenRoundedIcon
                            fontSize="small"
                            color="primary"
                          />
                        ) : (
                          <LockRoundedIcon
                            fontSize="small"
                            color="primary"
                            style={{ backgrounColor: "#fff" }}
                          />
                        )}
                      </IconButton>
                    }
                  />
                ) : (
                  <Input.Password
                    style={{ minWidth: "100%" }}
                    disabled={isDetail || accessRight === false}
                    placeholder="Nhập mật khẩu"
                    value={password.value}
                    onChange={(value) => handlePassword(value)}
                  />
                )}
              </Form.Item>
            </div>
          </div>
          <div className="sectionCont">
            <div className="leftSectionCont">
              <h4 style={{ marginTop: fileList !== null ? "0%" : 0 }}>
                {labels.fullname}
              </h4>
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
                  style={{ marginBottom: 1, minWidth: "100%" }}
                  disabled={isDetail || accessRight === false}
                  placeholder="Nhập họ tên"
                />
              </Form.Item>

              <h4>{labels.birthday}</h4>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  // minDate={moment().subtract(100, "years")._d}
                  // maxDate={moment().subtract(14, "years")._d}
                  inputFormat="dd/MM/yyyy"
                  value={date}
                  onChange={handleChange}
                  disabled={isDetail || accessRight === false}
                  renderInput={(params) => (
                    <TextField
                      style={{ width: "100%", paddingBottom: "12%" }}
                      {...params}
                      label=""
                      variant="standard"
                      InputLabelProps={{ shrink: false }}
                    />
                  )}
                />
              </LocalizationProvider>

              <h4>{labels.idcard}</h4>
              <Form.Item
                name="id_card"
                rules={[
                  {
                    required: true,
                    message: `Không được để trống CMND/CCCD`,
                  },
                  // {
                  //   required: true,
                  //   message: errorText.id_card,
                  //   max: 12,
                  //   min: 9,
                  // },
                ]}
                validateStatus={
                  ID_card.validateStatus !== ""
                    ? ID_card.validateStatus
                    : undefined
                }
                help={ID_card.errorMsg !== "" ? ID_card.errorMsg : undefined}
              >
                <Input
                  style={{ minWidth: "100%" }}
                  disabled={isDetail || accessRight === false}
                  placeholder="Nhập CMND"
                  value={ID_card}
                  onChange={(e) => handleID_card(e)}
                />
              </Form.Item>
            </div>
            <div className="rightSectionCont">
              <h4>{labels.address}</h4>
              <Form.Item
                name="address"
                rules={[
                  {
                    required: true,
                    message: `Không được để trống Địa Chỉ`,
                  },
                  {
                    pattern: new RegExp(/^\w/),
                    message: errorText.space,
                  },
                ]}
              >
                <Input
                  style={{ minWidth: "100%" }}
                  disabled={isDetail}
                  placeholder="Nhập địa chỉ"
                />
              </Form.Item>

              <h4>{labels.status}</h4>
              <div style={{ marginTop: "1%", marginBottom: "7%" }}>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={status}
                  onChange={handleStatus}
                  name="radio-buttons-group"
                >
                  <div class="radiogroupEmployees">
                    <FormControlLabel
                      disabled={isDetail || accessRight === false}
                      value="1"
                      control={<Radio size="small" color="info" />}
                      label="Đang làm"
                      style={{
                        backgroundColor: colors.success,
                        borderRadius: 12,
                      }}
                    />

                    <FormControlLabel
                      disabled={isDetail || accessRight === false}
                      value="2"
                      control={<Radio size="small" color="info" />}
                      label="Tạm nghỉ"
                      style={{
                        backgroundColor: colors.warning,
                        borderRadius: 12,
                      }}
                    />

                    <FormControlLabel
                      disabled={isDetail || accessRight === false}
                      value="3"
                      control={<Radio size="small" color="info" />}
                      label="Đã nghỉ"
                      style={{
                        backgroundColor: colors.error,
                        borderRadius: 12,
                      }}
                    />
                  </div>
                </RadioGroup>
              </div>

              <h4>{labels.position}</h4>

              <div className="PositionAdd">
                <div>
                  <div className="checkboxEmployees">
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled={isDetail || accessRight === false}
                          onChange={handleCheckbox}
                          checked={role}
                        />
                      }
                      name="employee"
                      label="Nhân viên"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled={isDetail || accessRight === false}
                          onChange={handleCheckbox}
                          checked={!role}
                        />
                      }
                      name="manager"
                      label="Quản lý"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="btnAdd">
          <Button
            size="Large"
            color="primary"
            variant="contained"
            style={{
              paddingLeft: "15%",
              paddingRight: "15%",
              paddingTop: "2%",
              paddingBottom: "2%",
              color: "#fff",
            }}
            disabled={loading || accessRight === false}
            onClick={dataItem && isDetail === true ? editItem : handleOk}
          >
            {dataItem && isDetail === true ? "Sửa" : "Lưu"}
          </Button>
          <Button
            disabled={loading || accessRight === false}
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
            onClick={dataItem && isDetail === true ? deleteItem : handleClose}
          >
            {dataItem && isDetail === true ? "Xoá " : "Hủy"}
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
export default ModalContent;
