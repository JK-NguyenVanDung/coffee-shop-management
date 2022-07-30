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
import * as collections from "../../../api/Collections/dish";
import * as cateCollections from "../../../api/Collections/category";

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
const { Option } = Select;

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
  const dataItem = useAppSelector((state) => state.dishes.detail);
  const [date, setDate] = React.useState(new Date("2001-08-18"));
  const [status, setStatus] = React.useState("1");
  let [role, setRole] = useState(true);
  const loadData = useAppSelector((state) => state.form.loadData);
  const modalError = useAppSelector((state) => state.form.modalError);
  const isDetail = useAppSelector((state) => state.form.detail);

  const listCate = useAppSelector((state) => state.dishes.listCate);

  const [fileList, setFileList] = useState([]);
  const [disablePass, setDisablePass] = useState(true);
  const [select, setSelect] = useState("");
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
    async function getCategories() {
      try {
        setLoading(true);
        const response = await cateCollections.getCategories();
        dispatch(actions.dishesActions.setListCate(response));
        setLoading(false);
      } catch (error) {
        //history.replace("/");
      }
    }
    getCategories();
  }, []);
  useEffect(() => {
    form.resetFields();
    setFileList(null);

    const setForm = () => {
      form.setFieldsValue({
        _id: dataItem._id,
        name: dataItem.name,
        amount: dataItem.amount,
        amount_sell: dataItem.amount_sell,
        price: dataItem.price,
        recipe: dataItem.recipe,
        status: dataItem.status,
        avatar: dataItem.avatar,
        dish_type: dataItem.dish_type[0],
        createdAt: moment(new Date(dataItem.createdAt)).format(
          "h:mma - DD/MM/YYYY"
        ),
        updatedAt: moment(new Date(dataItem.updatedAt)).format(
          "h:mma - DD/MM/YYYY"
        ),
        category_type: dataItem.category_type,
      });

      // nếu không có dữ liệu đặc biệt thì xoá
      setFileList([dataItem.avatar]);
      setStatus(dataItem.account_status);
      // setDate(new Date(dataItem.date_of_birth));
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

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        const temp = [];
        if (dataItem) {
          await collections.editDish({
            _id: dataItem._id,
            body: {
              name: values.name,
              recipe: values.recipe,
              price: values.price,
              active: values.active,
              avatar: fileList[0].name,
              dish_type: values.dish_type,
              category_type: values.category_type,
            },
          });
          handleClose();
          dispatch(actions.formActions.changeLoad(!loadData));
          message.success("Thay đổi thành công");

          setLoading(false);
        } else {
          await collections.addDish({
            name: values.name,
            recipe: values.recipe,
            price: values.price,
            active: values.active,
            avatar: fileList[0].name,
            dish_type: values.dish_type,
            category_type: values.category_type,
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
        console.log(info);
      });
  };

  function handleSelect(value) {
    setSelect(value);
  }
  function getHeaderTitle() {
    if (dataItem && isDetail) {
      return "Thông tin món ăn";
    }
    if (dataItem) {
      return "Sửa món ăn";
    }
    return "Thêm món ăn";
  }
  const handleDelete = async () => {
    setLoading(true);
    await collections.removeDish(dataItem._id);
    message.success("Xoá thành công");
    setLoading(false);
    dispatch(actions.formActions.hideDelete());
    dispatch(actions.formActions.closeForm());
    dispatch(actions.formActions.changeLoad(!loadData));
  };
  const labels = {
    avatar: "Hình ảnh",
    name: "Tên món",
    recipe: "Công thức",
    price: "Đơn giá",
    // amount: "Số lượng",
    amount_sell: "Đã bán",
    dish_type: "Loại món",
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
        <div className="bodyCont">
          <div style={{ width: "30%" }}>
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
                disabled={isDetail}
              >
                <UploadButton />
              </Upload>
              {/* </ImgCrop> */}
            </div>
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
                  <Input disabled={true} placeholder="Nhập" />
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
                  <Input disabled={true} placeholder="Nhập" />
                </Form.Item>
              </>
            ) : null}
          </div>
          <div>
            <h4>{labels.name}</h4>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: `Không được để trống tên món`,
                },
              ]}
            >
              <Input disabled={isDetail} placeholder="Nhập tên món" />
            </Form.Item>
            <h4>{labels.price}</h4>
            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: `Không được để trống giá`,
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
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                min={0}
                max={1000000000000}
                disabled={isDetail}
                placeholder="Nhập giá"
              />
            </Form.Item>
            {dataItem ? (
              <>
                <h4>{labels.amount_sell}</h4>
                <Form.Item
                  name="amount_sell"
                  rules={[
                    {
                      required: true,
                      message: `Không được để trống đã bán`,
                    },
                    {
                      pattern: new RegExp(/^\w/),
                      message: errorText.space,
                    },
                  ]}
                >
                  <Input disabled={true} placeholder="Nhập đã bán" />
                </Form.Item>
              </>
            ) : null}
            <h4>{labels.dish_type}</h4>
            <Form.Item
              name="dish_type"
              rules={[
                {
                  required: true,
                  message: `Không được để trống loại món`,
                },
                {
                  pattern: new RegExp(/^\w/),
                  message: errorText.space,
                },
              ]}
            >
              <Select
                disabled={isDetail}
                dropdownStyle={{ zIndex: 2000 }}
                placeholder="Nhập loại món"
                onChange={handleSelect}
              >
                {listCate.map((item) => {
                  return <Option value={item._id}>{item.name}</Option>;
                })}
              </Select>
            </Form.Item>
            <h4>{labels.dish_type}</h4>
            <Form.Item
              name="category_type"
              rules={[
                {
                  required: true,
                  message: `Không được để trống loại menu`,
                },
                {
                  pattern: new RegExp(/^\w/),
                  message: errorText.space,
                },
              ]}
            >
              <Select
                disabled={isDetail}
                dropdownStyle={{ zIndex: 2000 }}
                placeholder="Nhập loại menu"
              >
                <Option value={true}>Đồ uống</Option>
                <Option value={false}>Đồ ăn</Option>
              </Select>
            </Form.Item>
            <h4>{labels.recipe}</h4>
            <Form.Item
              name="recipe"
              rules={[
                {
                  required: true,
                  message: `Không được để trống công thức`,
                },
                {
                  pattern: new RegExp(/^\w/),
                  message: errorText.space,
                },
              ]}
            >
              <Input disabled={isDetail} placeholder="Nhập công thức" />
            </Form.Item>
          </div>
        </div>
        <div className="BtnAdd">
          <Button
            size="Large"
            color="success"
            variant="contained"
            style={{
              paddingLeft: "15%",
              paddingRight: "15%",
              paddingTop: "2%",
              paddingBottom: "2%",
              color: "#fff",
            }}
            onClick={dataItem && isDetail === true ? editItem : handleOk}
          >
            {dataItem && isDetail === true ? "Sửa" : "Lưu"}{" "}
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
            onClick={dataItem && isDetail === true ? deleteItem : handleClose}
          >
            {dataItem && isDetail === true ? "Xoá " : "Hủy"}
          </Button>
        </div>
      </Form>
      <AlertDialog
        children={`Xác nhận xoá ${dataItem ? dataItem.name : null} ?`}
        title="Xoá nhân viên"
        onAccept={handleDelete}
      />
    </div>
  );
};
export default ModalContent;
