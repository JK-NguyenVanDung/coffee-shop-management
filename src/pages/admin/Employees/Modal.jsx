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

const ModalContent = () => {
  const [loading, setLoading] = useState(false);
  const dataItem = useAppSelector((state) => state.employees.detail);
  const [date, setDate] = React.useState(new Date("2001-08-18"));
  const [status, setStatus] = React.useState("1");
  let [role, setRole] = useState(true);
  const loadData = useAppSelector((state) => state.form.loadData);
  const modalError = useAppSelector((state) => state.form.modalError);
  const isEdit = useAppSelector((state) => state.form.edit);
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
  const editItem = () => dispatch(actions.formActions.setEdit(true));
  useEffect(() => {
    form.resetFields();
    setFileList(null);

    const setForm = () => {
      if (dataItem) {
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
      }
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
    if (checkCustomValidation()) {
      form
        .validateFields()
        .then(async (values) => {
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
        })

        .catch((info) => {
          dispatch(actions.formActions.showError());

          setLoading(false);
        });
    } else {
      dispatch(actions.formActions.showError());
      setLoading(false);
    }
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
    if (dataItem && !isEdit) {
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
          <div style={{ width: "40%" }}>
            <h4>{labels.avatar}</h4>
            <div className="avatarCont">
              {/* <ImgCrop rotate> */}
              <Upload
                accept="image/*"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                maxCount={1}
                onChange={onChange}
                onPreview={onPreview}
                style={{ width: "500px", height: "100%" }}
                disabled={!isEdit}
              >
                <UploadButton />
              </Upload>
              {/* </ImgCrop> */}
            </div>
            <h4 style={{ marginTop: fileList !== null ? "4.5%" : 0 }}>
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
              <Input disabled={!isEdit} placeholder="Nhập họ tên" />
            </Form.Item>

            <div style={{ marginBottom: "10%" }}>
              <h4>{labels.birthday}</h4>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  // minDate={moment().subtract(100, "years")._d}
                  // maxDate={moment().subtract(14, "years")._d}
                  inputFormat="dd/MM/yyyy"
                  value={date}
                  onChange={handleChange}
                  disabled={!isEdit}
                  renderInput={(params) => (
                    <TextField
                      style={{ width: "100%" }}
                      {...params}
                      label=""
                      variant="standard"
                      InputLabelProps={{ shrink: false }}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
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
              validateStatus={ID_card.validateStatus}
              help={ID_card.errorMsg}
            >
              <Input
                disabled={!isEdit}
                placeholder="Nhập CMND"
                value={ID_card}
                onChange={(e) => handleID_card(e)}
              />
            </Form.Item>
          </div>
          <div>
            <h4>{labels.email}</h4>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: `Không được để trống email`,
                },
              ]}
              validateStatus={email.validateStatus}
              help={email.errorMsg}
            >
              <Input
                disabled={!isEdit}
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
              validateStatus={phone.validateStatus}
              help={phone.errorMsg}
            >
              <Input
                disabled={!isEdit}
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
              validateStatus={password.validateStatus}
              help={password.errorMsg}
            >
              {dataItem ? (
                <Input.Password
                  placeholder="Nhập mật khẩu"
                  disabled={disablePass || !isEdit}
                  value={password.value}
                  onChange={(value) => handlePassword(value)}
                  prefix={
                    <IconButton onClick={() => disablePassword()}>
                      {!disablePass ? (
                        <LockOpenRoundedIcon fontSize="small" color="primary" />
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
                  disabled={!isEdit}
                  placeholder="Nhập mật khẩu"
                  value={password.value}
                  onChange={(value) => handlePassword(value)}
                />
              )}
            </Form.Item>

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
              <Input disabled={!isEdit} placeholder="Nhập địa chỉ" />
            </Form.Item>
            <h4>{labels.status}</h4>
            <div style={{ marginTop: "5%", marginBottom: "5%" }}>
              <div>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={status}
                  onChange={handleStatus}
                  name="radio-buttons-group"
                >
                  <div class="radiogroupCont">
                    <FormControlLabel
                      disabled={!isEdit}
                      value="1"
                      control={<Radio size="small" color="info" />}
                      label="Còn làm"
                      style={{
                        backgroundColor: colors.success,
                        borderRadius: 12,
                      }}
                    />

                    <FormControlLabel
                      disabled={!isEdit}
                      value="2"
                      control={<Radio size="small" color="info" />}
                      label="Tạm nghỉ"
                      style={{
                        backgroundColor: colors.warning,
                        borderRadius: 12,
                      }}
                    />

                    <FormControlLabel
                      disabled={!isEdit}
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
            </div>
            <h4>{labels.position}</h4>
            <div style={{ marginBottom: "8%" }}>
              <div className="PositionAdd">
                <div>
                  <div className="checkboxCont">
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled={!isEdit}
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
                          disabled={!isEdit}
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
        <div className="BtnAdd">
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
            onClick={dataItem && !isEdit ? editItem : handleOk}
          >
            {dataItem ? "Sửa" : "Lưu"}
          </Button>
          <Button
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
            onClick={dataItem && isEdit === false ? deleteItem : handleClose}
          >
            {dataItem && isEdit === false ? "Xoá " : "Hủy"}
          </Button>
        </div>
      </Form>
      <AlertDialog
        children={`Xác nhận xoá ${dataItem.full_name} ?`}
        title="Xoá nhân viên"
        onAccept={handleDelete}
      />
    </div>
  );
};
export default ModalContent;
