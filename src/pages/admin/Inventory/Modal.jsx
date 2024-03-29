import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import MyPagination from "../../../components/Pagination";
import {
  Input,
  Table,
  Form,
  Popconfirm,
  Upload,
  message,
  Tooltip,
  InputNumber,
  Select,
} from "antd";
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
import * as collections from "../../../api/Collections/inventory";

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
import * as uploadAPI from "../../../api/Collections/upload";

import AlertModal from "../../../components/FormElements/AlertModal";
import AlertDialog from "../../../components/AlertDialog";
const { Option } = Select;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isLt5M = file.size / 1024 / 1024 >= 5;

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
  const dataItem = useAppSelector((state) => state.inventories.detail);
  const [date, setDate] = React.useState(new Date("2001-08-18"));
  const [status, setStatus] = React.useState("1");
  let [role, setRole] = useState(true);
  const loadData = useAppSelector((state) => state.form.loadData);
  const modalError = useAppSelector((state) => state.form.modalError);
  const isDetail = useAppSelector((state) => state.form.detail);

  const listOptions = [
    "thùng",
    "gói",
    "chai",
    "lọ",
    "g",
    "mg",
    "kg",
    "l",
    "ml",
  ];
  const listPayments = ["Trực tiếp", "Momo", "Ngân hàng"];
  const [fileList, setFileList] = useState([]);
  const [disablePass, setDisablePass] = useState(true);
  const [payment, setPayment] = useState("");
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

  const [unit, setUnit] = useState({
    value: listOptions[0],
    validateStatus: "",
    errorMsg: "",
    error: false,
  });
  const CustomError = () => {
    return (
      <div
        class="ant-form-item-explain ant-form-item-explain-connected"
        style={{ height: "auto", opacity: 1, minHeight: "24px" }}
      >
        <div role="alert" class="ant-form-item-explain-error">
          {unit.errorMsg}
        </div>
      </div>
    );
  };

  function checkCustomValidation() {
    if (
      unit.error === true ||
      !/^([^0-9]*)$/.test(unit.value) ||
      unit.value[0] === ""
    ) {
      //|| fileList.length < 1 thêm sau khi có hosting
      dispatch(actions.formActions.showError(unit.errorMsg));

      return false;
    } else if (fileList.length <= 0) {
      dispatch(actions.formActions.showError("Phải có ảnh"));

      return false;
    } else {
      return true;
    }
  }
  useEffect(() => {
    form.resetFields();
    setFileList(null);
    const setForm = () => {
      form.setFieldsValue({
        _id: dataItem._id,
        name: dataItem.name,
        amount: dataItem.amount.split("-")[0],
        price: dataItem.price,
        // payment_type: dataItem.payment_type,
        createdAt: moment(new Date(dataItem.createdAt)).format(
          "h:mma - DD/MM/YYYY"
        ),
        updatedAt: moment(new Date(dataItem.updatedAt)).format(
          "h:mma - DD/MM/YYYY"
        ),
      });
      setUnit({
        error: false,
        value: dataItem.amount.split("-")[1],
      });
      setPayment(getPaymentText(dataItem.payment_type));
      // nếu không có dữ liệu đặc biệt thì xoá
      setFileList([
        {
          uid: dataItem.avatar,
          url: dataItem.avatar,
        },
      ]); // setDate(new Date(dataItem.date_of_birth));
    };

    if (dataItem) {
      setForm();
    }
  }, [dataItem]);
  const { employee, manager } = role;
  const error = [employee, manager].filter((v) => v).length !== 1;
  const UploadButton = () => {
    return (
      <div style={fileList === null ? { width: 200, height: "50%" } : {}}>
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
  const getPaymentText = (e) => {
    let text = 0;
    switch (payment) {
      case "0":
        text = "Trực tiếp";
        break;
      case "1":
        text = "Momo";
        break;
      case "2":
        text = "Ngân hàng";
        break;
      default:
        text = "Trực tiếp";
        break;
    }
    return text;
  };
  const getPaymentType = () => {
    let numb = 0;
    switch (payment) {
      case "Trực tiếp":
        numb = 0;
        break;
      case "Momo":
        numb = 1;
        break;
      case "Ngân hàng":
        numb = 2;
        break;
      default:
        numb = 0;
        break;
    }
    return numb;
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

  function getValue(values) {
    return (
      values.amount + "-" + (unit.value === "" ? listOptions[0] : unit.value)
    );
  }
  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        if (checkCustomValidation()) {
          setLoading(true);
          let res = null;
          if (fileList[0].originFileObj) {
            const fmData = new FormData();
            fmData.append("file", fileList[0].originFileObj);
            res = await uploadAPI.upload(fmData);
          }
          if (dataItem) {
            await collections.editInventory({
              _id: dataItem._id,
              body: {
                name: values.name,
                amount: getValue(values),

                price: values.price,
                payment_type: getPaymentType(),
                createdAt: values.createdAt,
                updatedAt: values.updatedAt,
                avatar: res !== null ? res.name3 : dataItem.avatar,
              },
            });
            handleClose();
            dispatch(actions.formActions.changeLoad(!loadData));
            message.success("Thay đổi thành công");

            setLoading(false);
          } else {
            await collections.addInventory({
              name: values.name,
              amount: values.amount + "-" + unit.value,
              price: values.price,
              payment_type: getPaymentType(),
              createdAt: values.createdAt,
              updatedAt: values.updatedAt,
              avatar: res !== null ? res.name3 : "",
            });
            handleClose();
            dispatch(actions.formActions.changeLoad(!loadData));
            message.success("Thêm thành công");

            setLoading(false);
          }
        }
      })

      .catch((info) => {
        dispatch(actions.formActions.showError());
        setLoading(false);
      });
  };

  function handleSelect(value) {
    setUnit(validateUnit(value));
  }
  function handlePayment(value) {
    setPayment(value);
  }
  function validateUnit(value) {
    if (value.length <= 0) {
      return {
        value: value,
        validateStatus: "error",
        errorMsg: errorText.unit2,
        error: true,
      };
    }
    if (!/^([^0-9]*)$/.test(value[0])) {
      return {
        value: value,
        validateStatus: "error",
        errorMsg: errorText.unit,
        error: true,
      };
    }
    // if (value.length > 1) {
    //   return {
    //     value: value[value.length - 1],
    //     validateStatus: "error",
    //     errorMsg: errorText.unit,
    //     error: true,
    //   };
    // }
    return {
      value: value,

      error: false,
    };
  }
  function getHeaderTitle() {
    if (dataItem && isDetail) {
      return "Thông tin hàng hoá";
    }
    if (dataItem) {
      return "Sửa hàng hoá";
    }
    return "Thêm hàng hoá";
  }
  const handleDelete = async () => {
    setLoading(true);
    await collections.removeInventory(dataItem._id);
    message.success("Xoá thành công");
    setLoading(false);
    dispatch(actions.formActions.hideDelete());
    dispatch(actions.formActions.closeForm());
    dispatch(actions.formActions.changeLoad(!loadData));
  };
  const labels = {
    avatar: "Hình ảnh",
    name: "Tên món",
    amount: "Số lượng",
    unit: "Đơn vị",
    price: "Tổng tiền (VNĐ)",
    payment_type: "Phương thức thanh toán",
    create: "Ngày tạo",
    update: "Ngày cập nhật",
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
        <div className="inventoryCont">
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
                  style={{ width: "600px", height: "100%" }}
                  disabled={isDetail}
                >
                  <UploadButton />
                </Upload>
                {/* </ImgCrop> */}
              </div>
              <span
                style={{
                  marginBottom: "1vh",
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
              </span>
            </div>
            <div
              style={{
                width: "55%",
                display: "flex",
                flexDirection: "column",
                paddingRight: "4%",
              }}
            >
              <h4>{labels.name}</h4>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: `Không được để trống tên món`,
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
                  placeholder="Nhập tên món"
                />
              </Form.Item>

              <h4>{labels.amount}</h4>
              <Form.Item
                name="amount"
                rules={[
                  {
                    required: true,
                    message: `Không được để trống số lượng`,
                  },
                  {
                    pattern: new RegExp(/^\w/),
                    message: errorText.space,
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value} `.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  min={0}
                  max={1000000000000}
                  disabled={isDetail}
                />
              </Form.Item>

              <h4>{labels.unit}</h4>
              {/* <Form.Item
              name="unit"
              rules={[
                {
                  required: true,
                  message: `Không được để trống đơn vị`,
                },
              ]}
              validateStatus={
                unit.validateStatus ? unit.validateStatus : undefined
              }
              help={unit.errorMsg ? unit.errorMsg : undefined}
            >
          
            </Form.Item> */}
              <Select
                mode="tags"
                disabled={isDetail}
                dropdownStyle={{ zIndex: 2000 }}
                placeholder="Nhập đơn vị"
                onChange={handleSelect}
                onSelect={handleSelect}
                value={unit.value !== "" ? unit.value : listOptions[0]}
                status={unit.error ? `error` : undefined}
              >
                {listOptions.map((item) => {
                  return <Option value={item}>{item}</Option>;
                })}
              </Select>
              {unit.error ? (
                <CustomError />
              ) : (
                <div style={{ minHeight: "24px" }}></div>
              )}
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
              {dataItem ? (
                <>
                  <h4>{labels.create}</h4>
                  <Form.Item
                    name="createdAt"
                    rules={[
                      {
                        required: true,
                        message: `Không được để trống`,
                      },
                    ]}
                  >
                    <Input
                      style={{ minWidth: "100%" }}
                      disabled={true}
                      placeholder="Nhập"
                    />
                  </Form.Item>

                  <h4>{labels.update}</h4>
                  <Form.Item
                    name="updatedAt"
                    rules={[
                      {
                        required: true,
                        message: `Không được để trống`,
                      },
                    ]}
                  >
                    <Input
                      style={{ minWidth: "100%" }}
                      disabled={true}
                      placeholder="Nhập"
                    />
                  </Form.Item>
                </>
              ) : null}
            </div>

            <div
              style={{
                width: "55%",
                display: "flex",
                flexDirection: "column",
                paddingRight: "4%",
              }}
            >
              <h4>{labels.price}</h4>
              <Form.Item
                name="price"
                rules={[
                  {
                    required: true,
                    message: `Không được để trống tổng tiền`,
                  },
                  {
                    pattern: new RegExp(/^\w/),
                    message: errorText.space,
                  },
                ]}
              >
                <InputNumber
                  style={{ minWidth: "100%" }}
                  formatter={(value) =>
                    `${value} `.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  min={0}
                  max={1000000000000}
                  disabled={isDetail}
                />
              </Form.Item>

              <h4>{labels.payment_type}</h4>
              <Select
                name="payment_type"
                disabled={isDetail}
                dropdownStyle={{ zIndex: 2000 }}
                placeholder="Lựa chọn phương thức"
                onChange={handlePayment}
                value={payment !== "" ? payment : listPayments[0]}
              >
                {listPayments.map((item) => {
                  return <Option value={item}>{item}</Option>;
                })}
              </Select>
            </div>
          </div>
        </div>
        <div className="btnInventory">
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
            disabled={loading}
            onClick={dataItem && isDetail === true ? editItem : handleOk}
          >
            {dataItem && isDetail === true ? "Sửa" : "Lưu"}
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
            onClick={dataItem && isDetail === true ? deleteItem : handleClose}
          >
            {dataItem && isDetail === true ? "Xoá " : "Hủy"}
          </Button>
        </div>
      </Form>
      <AlertDialog
        children={`Xác nhận xoá ${dataItem ? dataItem.name : null} ?`}
        title="Xoá hàng hóa"
        onAccept={handleDelete}
      />
    </div>
  );
};
export default ModalContent;
